// src/components/DirectChatPage.jsx
import React, { useState } from 'react';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';

const DirectChatPage = () => {
  const [username, setUsername] = useState('');

  function createDirectChat(creds) {
    console.log("Creating direct chat with username:", username);
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => {
        setUsername('');
        console.log("Direct chat created or fetched successfully");
      }
    );
  }

  function renderChatForm(creds) {
    return (
      <div className="p-4">
        <input 
          className="border p-2 mr-2 rounded"
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded" 
          onClick={() => createDirectChat(creds)}
        >
          Create
        </button>
      </div>
    );
  }

  return (
    <ChatEngine
      height="100vh"
      userName={import.meta.env.VITE_APP_CHAT_ENGINE_USERNAME}
      userSecret={import.meta.env.VITE_APP_CHAT_ENGINE_USER_SECRET}
      projectID={import.meta.env.VITE_APP_CHAT_ENGINE_PROJECT_ID}
      renderNewChatForm={(creds) => renderChatForm(creds)}
      onConnect={() => console.log("WebSocket connected")}
      onFailAuth={(auth) => console.log("Authentication failed", auth)}
      onFail={error => console.log("WebSocket connection failed", error)}
    />
  );
};

export default DirectChatPage;
