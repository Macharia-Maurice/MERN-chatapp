import React from 'react';
import { useProfileMeQuery } from '@/redux/features/profiles/profileApiSlice';
import { Link } from 'react-router-dom';
import { Avatar } from 'react-chat-elements';

const UserProfile = () => {
    const { data, error, isLoading } = useProfileMeQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile</div>;

    const { profilePicture, user } = data.userProfile;
    const { first_name, last_name } = user;

    return (
        <div className="flex items-center p-4 mb-4 border-b border-gray-300">
            <Link to="/profile">
            <Avatar
                src={`http://localhost:2000/${profilePicture}`}
                alt={`${first_name} ${last_name}`}
                size="large"
                type='circle'
            />
            </Link>
                
        </div>
    );
};

export default UserProfile;
