import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;
    constructor () {
        this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    //here we are creating the service for creating a post 
    //for this we are using the different attributes that we have define in the appwrite 
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        
        }catch (error) {
            console.log("Appwrite Service::createPost::error",error);
        }
    }

    //now we will make the service for updating the post what we are posting on the website 
    //here slug is working as a document ID 
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status, 
                }
            );
            
        }catch (error) {
            console.log("Appwrite Service::updatePost::error",error);
        } 
    }

    //now we will make the service for deleting the post what we are posting on the website 
    async deletePost(slug){
        try{
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        }catch (error) {
            console.log("Appwrite Service::deletePost::error",error);
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        }catch (error) {
            console.log("Appwrite Service::getPost::error",error);
            return false;
        }
    }
    //here we are accessing all the posts in the database whose status is active and for that we are using the queries 
    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        }catch (error) {
            console.log("Appwrite Service::getPosts::error",error);
            return false;
        }
    }
    //now we will create the service for the uploading the files 
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            ); 
        }catch (error) {
            console.log("Appwrite Service::uploadFile::error",error);
            return false;
        }
    }
    //now we will create the service for the deleting the files 
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId 
            );
            return true;
        }catch (error) {
            console.log("Appwrite Service::deleteFile::error",error);
            return false;
        }
    }
    async getFilePreview(fileId){
        try{
            return this.bucket.getFile(
                conf.appwriteBucketId,
                fileId 
            );
        }catch (error) {
            console.log("Appwrite Service::getFile::error",error);
            return false;
        }
    }
}

const service = new Service();
export default service;