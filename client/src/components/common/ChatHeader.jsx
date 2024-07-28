import React from 'react';
import { Link } from 'react-router-dom';
import { useGetChatQuery } from "@/redux/features/chats/chatApiSlice";
import { useProfileMeQuery } from "@/redux/features/profiles/profileApiSlice";
import { useGetUserProfileQuery } from "@/redux/features/profiles/profileApiSlice";

const ChatHeader = ({ chatId }) => {
  const { data: chatData, error: chatError, isLoading: chatLoading } = useGetChatQuery(chatId);
  const { data: meData, error: meError, isLoading: meLoading } = useProfileMeQuery();

  if (chatLoading || meLoading) {
    return <div>Loading...</div>;
  }

  if (chatError || meError) {
    return <div>Error loading data</div>;
  }

  console.log("chatData:", chatData);
  console.log("meData:", meData);

  if (!chatData || !chatData.chat || !Array.isArray(chatData.chat.members) || !meData || !meData.userProfile) {
    return <div>No data available</div>;
  }

  const { members } = chatData.chat;
  const { userProfile } = meData;

  // Get the other member's profile ID
  const otherMemberId = members.find(member => member._id !== userProfile._id)._id;

  // Fetch the other member's profile
  const { data: otherMemberData, error: otherMemberError, isLoading: otherMemberLoading } = useGetUserProfileQuery(otherMemberId);

  if (otherMemberLoading) {
    return <div>Loading other member...</div>;
  }

  if (otherMemberError) {
    return <div>Error loading other member</div>;
  }

  if (!otherMemberData || !otherMemberData.userProfile) {
    return <div>No data available for other member</div>;
  }

  const otherMemberProfile = otherMemberData.userProfile;

  return (
    <div className="flex items-center p-4 bg-gray-100 border-b">
      <Link to={`/profile/${otherMemberProfile._id}`} className="flex items-center">
        <img
          src={`http://localhost:2000/${otherMemberProfile.profilePicture}`}
          alt="Profile"
          className="h-12 w-12 rounded-full object-cover"
        />
        <span className="ml-2 text-lg font-medium">{`${otherMemberProfile.user.first_name} ${otherMemberProfile.user.last_name}`}</span>
      </Link>
    </div>
  );
};

export default ChatHeader;
