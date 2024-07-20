import React from 'react';
import { useProfileMeQuery } from '@/redux/features/profiles/profileApiSlice';
import { Link } from 'react-router-dom'; // Import Link if you're using React Router
import { Avatar } from 'react-chat-elements'; // Make sure Avatar is available or use a similar component

const UserProfile = () => {
    const { data, error, isLoading } = useProfileMeQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile</div>;

    const { profilePicture, user } = data.userProfile;
    const { first_name, last_name } = user;

    return (
        <div className="flex items-center p-4 mb-4 border-b border-gray-300">
            <Avatar
                src={`http://localhost:2000/${profilePicture}`}
                alt={`${first_name} ${last_name}`}
                size="large"
                type='circle'
            />
            <div className="ml-3">
                <div className="font-bold">{first_name} {last_name}</div>
                <Link to="/profile" className="text-blue-500">View Profile</Link>
            </div>
        </div>
    );
};

export default UserProfile;
