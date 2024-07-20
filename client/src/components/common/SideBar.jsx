import React from "react";
import { ChatItem } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const SideBar = ({ setSelectedChat }) => {
    // Mock data for chats (this could be fetched from an API)
    const chats = [
        { id: 1, name: "John Doe", profilePicture: "profile1.png" },
        { id: 2, name: "Jane Smith", profilePicture: "profile2.png" },
        { id: 3, name: "Alice Johnson", profilePicture: "profile3.png" },
        { id: 4, name: "Bob Brown", profilePicture: "profile4.png" },
        { id: 5, name: "Charlie Davis", profilePicture: "profile5.png" },
        { id: 6, name: "Daisy Evans", profilePicture: "profile6.png" },
        { id: 7, name: "Edward Green", profilePicture: "profile7.png" },
        { id: 8, name: "Fiona Harris", profilePicture: "profile8.png" },
        { id: 9, name: "George Ives", profilePicture: "profile9.png" },
        { id: 10, name: "Hannah Jones", profilePicture: "profile10.png" },
        { id: 11, name: "Ian King", profilePicture: "profile11.png" },
        { id: 12, name: "Julia Lewis", profilePicture: "profile12.png" },
        { id: 13, name: "Kevin Moore", profilePicture: "profile13.png" },
        { id: 14, name: "Laura Nelson", profilePicture: "profile14.png" },
        { id: 15, name: "Michael Owen", profilePicture: "profile15.png" },
        { id: 16, name: "Nina Parker", profilePicture: "profile16.png" },
        { id: 17, name: "Oscar Quinn", profilePicture: "profile17.png" },
        { id: 18, name: "Paul Robinson", profilePicture: "profile18.png" },
        { id: 19, name: "Quinn Stewart", profilePicture: "profile19.png" },
        { id: 20, name: "Rachel Taylor", profilePicture: "profile20.png" }
    ];

    return (
        <div className="p-4">
            {/* Render each chat item */}
            {chats.map(chat => (
                <ChatItem
                    key={chat.id}
                    className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-2"
                    avatar={`http://localhost:2000/${chat.profilePicture}`}
                    alt={"profile_pic"}
                    title={chat.name}
                    onClick={() => setSelectedChat(chat)} // Set selected chat on click
                />
            ))}
        </div>
    );
};

export default SideBar;
