// src/components/common/ProfilesList.jsx
import React from 'react';
import { useListAllProfilesQuery } from '@/redux/features/profiles/profileApiSlice';
import { useCreateChatMutation } from '@/redux/features/chats/chatApiSlice';
import { ChatItem } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const ProfilesList = ({ onProfileSelect, onBack }) => {
  const { data, error, isLoading } = useListAllProfilesQuery();
  const [createChat] = useCreateChatMutation(); // Initialize the createChat mutation

  if (isLoading) return <div>Loading profiles...</div>;
  if (error) return <div>Error loading profiles.</div>;

  // Ensure data exists and has profiles
  const profiles = data?.data?.profiles || [];

  if (!Array.isArray(profiles)) {
      return <div>Unexpected data format for profiles.</div>;
  }

  const handleProfileClick = async (profileId) => {
      try {
          // Create a chat with the selected profile
          const response = await createChat({ profileId }).unwrap();
          // Open the chat (or set it as selected chat)
          onProfileSelect(response.chat);
      } catch (error) {
          console.error("Error creating chat:", error);
      }
  };

  return (
      <div>
          <button onClick={onBack}>Back to Chats</button>
          {profiles.map(profile => (
              <ChatItem
                  key={profile._id}
                  title={`${profile.user.first_name} ${profile.user.last_name}`}
                  subtitle={profile.bio || "No bio available"}
                  avatar={`http://localhost:2000/${profile.profilePicture}`}
                  onClick={() => handleProfileClick(profile._id)}
                  date={false}
              />
          ))}
      </div>
  );
};

export default ProfilesList;
