import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'
//here we are passing the parameter to get the value from the appwrite services 
function PostCard({$id, title, featuredImage}) {
    
  return (
    //next line is linking the post card to the app write service and on clicking the post we will go into the post by using its id 
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
              {/* here we are accessing the image using the appwrite service featuredImage we made  */}
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard

