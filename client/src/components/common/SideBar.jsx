// src/components/common/SideBar.jsx
import React from "react";
import { ChatItem } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import UserHeader from "./UserHeader";

const SideBar = ({ setSelectedChat, chats }) => {
    if (!Array.isArray(chats)) {
        return <div>No chats available</div>;
    }

    return (
        <div>
            <UserHeader />
            {chats.map((chat) => (
                <ChatItem
                    key={chat._id}
                    title={chat.otherMember.name || "Chat"}
                    subtitle={chat.lastMessage?.text || "No messages"}
                    date={new Date(chat.updatedAt)}
                    unread={chat.unreadMessagesCount || 3}
                    avatar={`http://localhost:2000/${chat.otherMember.profilePicture}`}
                    alt="profile"
                    onClick={() => setSelectedChat(chat)}
                />
            ))}
        </div>
    );
};

export default SideBar;
