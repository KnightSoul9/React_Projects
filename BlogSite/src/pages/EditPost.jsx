import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
//here we are edditing the post 
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    //we running the useeffects if the any change in the slug or navigation is happening
    useEffect(() => {
        //if slug is changed then get the post using the slug 
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                //if we find the post then update the post 
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost