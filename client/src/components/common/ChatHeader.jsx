import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetChatQuery } from "@/redux/features/chats/chatApiSlice";
import { useProfileMeQuery, useGetUserProfileQuery } from "@/redux/features/profiles/profileApiSlice";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const ChatHeader = ({ chatId }) => {
  const { data: chatData, error: chatError, isLoading: chatLoading } = useGetChatQuery(chatId);
  const { data: meData, error: meError, isLoading: meLoading } = useProfileMeQuery();

  const otherMemberProfileId = useMemo(() => {
    if (chatData?.chat?.members && meData?.userProfile) {
      const otherMember = chatData.chat.members.find(member => member._id !== meData.userProfile._id);
      console.log(`Other Member Profile ID: ${otherMember?._id}`);
      return otherMember?._id;
    }
    return null;
  }, [chatData, meData]);

  const { data: userProfileData, error: userProfileError, isLoading: userProfileLoading } = useGetUserProfileQuery(otherMemberProfileId, { skip: !otherMemberProfileId });

  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);

  useEffect(() => {
    if (otherMemberProfileId) {
      console.log(`Checking status for other member: ${otherMemberProfileId}`);
      socket.emit("checkStatus", otherMemberProfileId);

      socket.on("statusChange", (profileId, status, lastSeen) => {
        console.log(`Status change for user: ${profileId}, Online: ${status}, Last seen: ${lastSeen}`);
        if (profileId === otherMemberProfileId) {
          setIsOnline(status);
          setLastSeen(lastSeen);
        }
      });

      return () => {
        socket.off("statusChange");
      };
    }
  }, [otherMemberProfileId]);

  useEffect(() => {
    if (meData?.userProfile) {
      socket.emit("profileOnline", meData.userProfile._id);
    }

    return () => {
      if (meData?.userProfile) {
        socket.emit("profileLogout", meData.userProfile._id);
      }
    };
  }, [meData]);

  if (chatLoading || meLoading || (userProfileLoading && otherMemberProfileId)) {
    return <div>Loading...</div>;
  }

  if (chatError || meError || userProfileError) {
    console.error('Error loading data', chatError, meError, userProfileError);
    return <div>Error loading data</div>;
  }

  if (!chatData?.chat?.members || !meData?.userProfile || !otherMemberProfileId || !userProfileData?.userProfile) {
    console.log('No data available', chatData, meData, otherMemberProfileId, userProfileData);
    return <div>No data available</div>;
  }

  const { userProfile } = userProfileData;

  return (
    <div className="flex items-center p-4 bg-gray-100 border-b">
      <Link to={`/profile/${otherMemberProfileId}`} className="flex items-center">
        <img
          src={`http://localhost:2000/${userProfile.profilePicture}`}
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="ml-2">
          <span className="text-lg font-medium">
            {userProfile.user.first_name} {userProfile.user.last_name}
          </span>
          <div className="text-sm text-gray-500">
            {isOnline ? "Online" : `Last seen: ${lastSeen ? new Date(lastSeen).toLocaleString() : "Unknown"}`}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChatHeader;
