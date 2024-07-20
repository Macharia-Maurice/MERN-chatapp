import React, { useState } from "react";
import SideBar from "@/components/common/SideBar";
import MessagePage from "@/components/common/MessagePage";

const Home = () => {
    // State to manage the currently selected chat
    const [selectedChat, setSelectedChat] = useState(null);

    // Mock data for chat messages (this could be fetched from an API)
    const chatMessages = {
        1: [{ position: 'left', type: 'text', text: 'Hello!', date: new Date() }],
        2: [{ position: 'right', type: 'text', text: 'Hi there!', date: new Date() }],

    };

    return (
        <div className="flex h-screen">
            {/* Sidebar: Takes up 1/4 of the screen width */}
            <div className="w-1/4 bg-white border-r overflow-y-auto">
                <SideBar setSelectedChat={setSelectedChat} />
            </div>
            {/* Message Page: Takes up the remaining 3/4 of the screen width */}
            <div className="w-3/4 bg-gray-100 flex flex-col">
                {/* Pass selectedChat and messages to MessagePage */}
                <MessagePage 
                    selectedChat={selectedChat} 
                    messages={selectedChat ? chatMessages[selectedChat.id] : []} 
                />
            </div>
        </div>
    );
};

export default Home;
