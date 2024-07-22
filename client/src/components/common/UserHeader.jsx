import React from 'react';
import { useProfileMeQuery } from '@/redux/features/profiles/profileApiSlice';
import { Link } from 'react-router-dom';
import { Avatar } from 'react-chat-elements';

const UserHeader = () => {
    const { data, error, isLoading } = useProfileMeQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile</div>;

    const { profilePicture } = data.userProfile;

    return (
        <div className="flex items-center justify-between p-4 mb-4 border-b border-gray-300 bg-white shadow-sm">
            <Link to="/profile">
                <Avatar
                    src={`http://localhost:2000/${profilePicture}`}
                    alt="User Profile"
                    size="large"
                    type="circle"
                    className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                />
            </Link>
            <div className="flex items-center space-x-4">
                <Link to="/all-users">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                        New Chat
                    </button>
                </Link>
                <Link to="/settings">
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                        Settings
                    </button>
                </Link>
                <Link to="/logout">
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300">
                        Logout
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default UserHeader;
