import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    //here we are creating the use state variable and we are taking the post in that variable 
    const [posts, setPosts] = useState([])
    //this code is written with the help of the chatGPT to avoid the flickering in this page 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsData = await appwriteService.getPosts([]);
                if (postsData) {
                    setPosts(postsData.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []); 
    //then we are looping all the posts 
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard $id={post.$id}
                              title={post.title}
                               featuredImage={post.featuredImage} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts