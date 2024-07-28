import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetChatQuery } from "@/redux/features/chats/chatApiSlice";
import { useProfileMeQuery, useGetUserProfileQuery } from "@/redux/features/profiles/profileApiSlice";

const ChatHeader = ({ chatId }) => {
  const { data: chatData, error: chatError, isLoading: chatLoading } = useGetChatQuery(chatId);
  const { data: meData, error: meError, isLoading: meLoading } = useProfileMeQuery();

  const otherMemberId = useMemo(() => {
    if (chatData?.chat?.members && meData?.userProfile) {
      return chatData.chat.members.find(member => member._id !== meData.userProfile._id)?._id;
    }
    return null;
  }, [chatData, meData]);

  const { data: userProfileData, error: userProfileError, isLoading: userProfileLoading } = useGetUserProfileQuery(otherMemberId, { skip: !otherMemberId });

  if (chatLoading || meLoading || (userProfileLoading && otherMemberId)) {
    return <div>Loading...</div>;
  }

  if (chatError || meError || userProfileError) {
    return <div>Error loading data</div>;
  }

  if (!chatData?.chat?.members || !meData?.userProfile || !otherMemberId || !userProfileData?.userProfile) {
    return <div>No data available</div>;
  }

  const { userProfile } = userProfileData;

  return (
    <div className="flex items-center p-4 bg-gray-100 border-b">
      <Link to={`/profile/${otherMemberId}`} className="flex items-center">
        <img
          src={`http://localhost:2000/${userProfile.profilePicture}`}
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover"
        />
        <span className="ml-2 text-lg font-medium">
          {userProfile.user.first_name} {userProfile.user.last_name}
        </span>
      </Link>
    </div>
  );
};

export default ChatHeader;
