import React from "react";
import { ChatItem } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const SideBar = ({ setSelectedChat }) => {
    const chats = [
        { id: 1, name: "John Doe", profilePicture: "profile1.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
    ];

    return (
        <div className="p-4">
            {chats.map(chat => (
                <ChatItem
                    key={chat.id}
                    className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    avatar={`http://localhost:2000/${chat.profilePicture}`}
                    alt={"profile_pic"}
                    title={chat.name}
                    onClick={() => setSelectedChat(chat)}
                />
            ))}
        </div>
    );
};

export default SideBar;
