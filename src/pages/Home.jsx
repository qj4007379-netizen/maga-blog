import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import authService from '../appwrite/auth';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // loading state add کیا
    const [user, setUser] = useState(null); // موجودہ یوزر

    useEffect(() => {
        // سب سے پہلے current user check کریں
        authService.getCurrentUser()
        .then((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // اب posts load کریں کیونکہ user authenticated ہے
                return appwriteService.getPosts();
            } else {
                setUser(null);
                setLoading(false);
                return null;
            }
        })
        .then((postsData) => {
            if (postsData) {
                setPosts(postsData.documents);
            }
        })
        .catch((err) => {
            console.log("Error loading posts:", err);
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 text-center">
                Loading...
            </div>
        )
    }

    if (!user) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
