import React from 'react';
import { ChatItem } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import UserHeader from './UserHeader';

const SideBar = ({ setSelectedChat }) => {

        // fetch chats from API
    const chats = [
        { id: 1, name: "John Doe", profilePicture: "profile1.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
    ];

    return (
        <div className="p-4 flex flex-col h-screen bg-gray-50">
            {/* Render the userHeader at the top of the sidebar */}
            <UserHeader />
            {/* Render each chat item */}
            <div className="flex-grow overflow-y-auto mt-4">
                {chats.map(chat => (
                    <ChatItem
                        key={chat.id}
                        className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-2 p-2 bg-white"
                        avatar={`http://localhost:2000/${chat.profilePicture}`}
                        alt={"profile_pic"}
                        title={chat.name}
                        onClick={() => setSelectedChat(chat)} // Set selected chat on click
                    />
                ))}
            </div>
        </div>
    );
};

export default SideBar;
