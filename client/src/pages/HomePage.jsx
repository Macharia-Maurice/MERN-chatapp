// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useGetUserChatsQuery } from "@/redux/features/chats/chatApiSlice";
import SideBar from "@/components/common/SideBar";
import MessagePage from "@/components/common/MessagePage";
import { useSelector } from "react-redux";

const Home = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const { data, isLoading, isError } = useGetUserChatsQuery();
    const userId = useSelector((state) => state.auth.userId); // Assuming userId is stored in the auth slice

    useEffect(() => {
        console.log(data); // Log the data to check the structure
    }, [data]);

    if (isLoading) return <div>Loading chats...</div>;
    if (isError) return <div>Error loading chats.</div>;

    const chats = data?.chats || [];

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white border-r overflow-y-auto">
                <SideBar setSelectedChat={setSelectedChat} chats={chats} userId={userId} />
            </div>
            <div className="w-3/4 flex flex-col">
                <MessagePage selectedChat={selectedChat} />
            </div>
        </div>
    );
};

export default Home;
