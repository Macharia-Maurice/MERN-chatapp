import React, { useState } from "react";
import SideBar from "@/components/common/SideBar";
import MessagePage from "@/components/common/MessagePage";

const Home = () => {
    // State to manage the currently selected chat
    const [selectedChat, setSelectedChat] = useState(null);

    // Mock data for chat messages (this could be fetched from an API)
	const chatMessages = {
		1: [
			{ position: 'left', type: 'text', text: 'Hello!', date: new Date(), id: 'msg1' },
			{ position: 'right', type: 'text', text: 'Hi there!', date: new Date(), id: 'msg2' },
			{ position: 'left', type: 'text', text: 'How are you?', date: new Date(), reply: { photoURL: 'https://facebook.github.io/react/img/logo.svg', title: 'You', message: 'Hi there!' }, id: 'msg3' },
		],
		2: [
			{ position: 'right', type: 'text', text: 'Hello!', date: new Date(), id: 'msg4' },
			{ position: 'left', type: 'text', text: 'Hi!', date: new Date(), id: 'msg5' },
		],
	};
	
	

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar: Takes up 1/4 of the screen width */}
            <div className="w-1/4 bg-white border-r overflow-y-auto">
                <SideBar setSelectedChat={setSelectedChat} />
            </div>
            {/* Message Page: Takes up the remaining 3/4 of the screen width */}
            <div className="w-3/4 flex flex-col">
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
