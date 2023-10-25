'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    const searchParams = useSearchParams();
    const userId = searchParams.get('id');
    const userName = searchParams.get('username')?.charAt(0).toUpperCase() + searchParams.get('username')?.slice(1);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/users/${userId}/posts`);
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        if (session?.user.id) {
            fetchPost();
        }
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = window.confirm("Are you sure you want to delete this post?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE",
                });
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const profileName = session?.user.id === userId ? "My" : `${userName}'s`;

    return (
        <Profile
            name={profileName}
            desc={"Welcome to your personalized profile page"}
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;