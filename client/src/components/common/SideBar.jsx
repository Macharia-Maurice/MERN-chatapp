// src/components/common/SideBar.jsx
import React from "react";
import { ChatItem } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import UserHeader from "./UserHeader";

const SideBar = ({ setSelectedChat, chats, profiles, onNewChatClick }) => {
    return (
        <div>
            <UserHeader onNewChatClick={onNewChatClick} />
            {profiles && profiles.length > 0 ? (
                profiles.map((profile) => (
                    <ChatItem
                        key={profile._id}
                        title={`${profile.user.first_name || ''} ${profile.user.last_name || ''}`}
                        subtitle={profile.bio || "No bio available"}
                        avatar={`http://localhost:2000/${profile.profilePicture}`}
                        alt="profile"
                        onClick={() => {
                            // Implement click handler if needed
                        }}
                    />
                ))
            ) : (
                chats.map((chat) => (
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
                ))
            )}
        </div>
    );
};

export default SideBar;
