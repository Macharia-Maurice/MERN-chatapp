import React, { useState } from "react";
import SideBar from "@/components/common/SideBar";
import MessagePage from "@/components/common/MessagePage";

const Home = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    // Mock data: you might want to fetch these from an API
    const chatMessages = {
        1: [{ position: 'left', type: 'text', text: 'Hello!', date: new Date() }],
        2: [{ position: 'right', type: 'text', text: 'Hi there!', date: new Date() }],
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-1/4 bg-white shadow-lg">
                <SideBar setSelectedChat={setSelectedChat} />
            </div>
            <div className="w-3/4 bg-gray-100">
                <MessagePage 
                    selectedChat={selectedChat} 
                    messages={selectedChat ? chatMessages[selectedChat.id] : []} 
                />
            </div>
        </div>
    );
};

export default Home;
