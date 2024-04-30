//we have created this auth file to do what appwrite is doing in the backend here we are just hard coding it if in future i want to shift on some other backend service then i will just write the different services code and start using it 
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//it is class
export class AuthService{
    client = new Client() 
    account;
    //we are creating account in the constructor so that it triggers every time a object is created 
    constructor () {
    this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({email, password, name}) {
        try{
         const userAccount =await this.account.create(ID.unique(),email,password,name);
         if (userAccount) {
            //if user account is already created then just login 
            return this.login({email,password})
         } else {
            return userAccount
         }
        }catch (error) {
            throw error;
        }
    }
    async login({email, password}) {
        try{
            return await this.account.createEmailSession(email, password);
        }catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch (error) {
            console.log("AppWrite service :: getCurrentUser :: error",error);
        }
        return null;
    }
    async logout() {
        try {
            await this.account.deleteSessions();
            } catch (error){
            console.log ("Appwrite serive :: logout :: error",error);
        }
    }
}
//and it is the object so if we want any details from ibject we can simply get access by using authService.value  
const authService = new AuthService()
export default authService