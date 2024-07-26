// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useGetUserChatsQuery } from "@/redux/features/chats/chatApiSlice";
import SideBar from "@/components/common/SideBar";
import MessagePage from "@/components/common/MessagePage";
import { useGetAllMessagesQuery } from "@/redux/features/messages/messageApiSlice";

const Home = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const { data: chats, isLoading, isError } = useGetUserChatsQuery();
    const { data: messages, isFetching: isFetchingMessages } = useGetAllMessagesQuery(selectedChat?._id, {
        skip: !selectedChat
    });

    useEffect(() => {
        // console.log('Chats:', chats);
    }, [chats]);

    useEffect(() => {
        console.log('Messages:', messages);
    }, [messages]);

    useEffect(() => {
        // console.log('Selected Chat:', selectedChat);
    }, [selectedChat]);

    if (isLoading) return <div>Loading chats...</div>;
    if (isError) return <div>Error loading chats.</div>;

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white border-r overflow-y-auto">
                <SideBar setSelectedChat={setSelectedChat} chats={chats?.chats || []} />
            </div>
            <div className="w-3/4 flex flex-col">
                {selectedChat ? (
                    isFetchingMessages ? (
                        <div>Loading messages...</div>
                    ) : (
                        <MessagePage selectedChat={selectedChat} messages={messages?.data?.messages || []} />
                    )
                ) : (
                    <div>Select a chat to view messages</div>
                )}
            </div>
        </div>
    );
};

export default Home;
