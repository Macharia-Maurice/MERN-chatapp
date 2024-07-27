import React from 'react';
import { useProfileMeQuery } from '@/redux/features/profiles/profileApiSlice';
import { Link } from 'react-router-dom';
import { Avatar } from 'react-chat-elements';

const UserHeader = ({ onNewChatClick }) => {
    const { data, error, isLoading } = useProfileMeQuery();

    if (isLoading) return <div className="text-center text-gray-500">Loading profile...</div>;
    if (error) return <div className="text-center text-red-500">Error loading profile</div>;

    const { profilePicture } = data.userProfile;

    return (
        <div className="flex items-center justify-between p-4 mb-4 border-b border-gray-300 bg-white shadow-md">
            <Link to="/profile">
                <Avatar
                    src={`http://localhost:2000/${profilePicture}`}
                    alt="User Profile"
                    size="large"
                    type="circle"
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                />
            </Link>
            <button
                onClick={onNewChatClick}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                New Chat
            </button>
        </div>
    );
};

export default UserHeader;
