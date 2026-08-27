import React, {useState, useEffect} from 'react'
import { container } from '../components/container/container.jsx'
import PostCard from '../components/PostCard/PostCard.jsx'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  return (
    <div className='w-full py-8'>
        <container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </container>
    </div>
  )
}

export default AllPosts
