// src/pages/Home.jsx
import React, { useState } from "react";
import { useGetUserChatsQuery } from "@/redux/features/chats/chatApiSlice";
import { useListAllProfilesQuery } from "@/redux/features/profiles/profileApiSlice";
import SideBar from "@/components/common/SideBar";
import MessagePage from "@/components/common/MessagePage";
import { useGetAllMessagesQuery } from "@/redux/features/messages/messageApiSlice";
import ProfilesList from "@/components/common/ProfilesList";

const Home = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [showProfileList, setShowProfileList] = useState(false);

    const { data: chats, isLoading: isLoadingChats, isError: isErrorChats } = useGetUserChatsQuery();
    const { data: profiles, isLoading: isLoadingProfiles, isError: isErrorProfiles } = useListAllProfilesQuery();
    const { data: messages, isFetching: isFetchingMessages } = useGetAllMessagesQuery(selectedChat?._id, {
        skip: !selectedChat
    });

    if (isLoadingChats || isLoadingProfiles) return <div>Loading...</div>;
    if (isErrorChats) return <div>Error loading chats.</div>;
    if (isErrorProfiles) return <div>Error loading profiles.</div>;

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/3 bg-white border-r overflow-y-auto">
                {showProfileList ? (
                    <ProfilesList
                        onProfileSelect={(chat) => {
                            setSelectedChat(chat);
                            setShowProfileList(false); // Hide profile list after selection
                        }}
                        onBack={() => setShowProfileList(false)} // Handle back button
                    />
                ) : (
                    <SideBar
                        setSelectedChat={setSelectedChat}
                        chats={chats?.chats || []}
                        profiles={profiles || []}
                        onNewChatClick={() => setShowProfileList(true)} // Show profile list for new chat
                    />
                )}
            </div>
            <div className="w-2/3 flex flex-col">
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
