import React, { useState, useEffect, useRef } from 'react';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const MessagePage = ({ selectedChat, messages }) => {
    const [input, setInput] = useState('');
    const [messageList, setMessageList] = useState(messages);
    const [replyingTo, setReplyingTo] = useState(null);
    const textareaRef = useRef(null);

    // Handle sending a new message
    const handleSend = () => {
        if (input.trim() !== '') {
            const newMessage = {
                position: 'right',
                type: 'text',
                text: input,
                date: new Date(),
                reply: replyingTo ? {
                    photoURL: replyingTo.avatar,
                    title: replyingTo.title,
                    message: replyingTo.text,
                } : null,
            };

            setMessageList(prevMessages => [...prevMessages, newMessage]);
            setInput('');
            setReplyingTo(null); // Clear reply state after sending
        }
    };

    // Update message list when selected chat or messages change
    useEffect(() => {
        setMessageList(messages);
    }, [selectedChat, messages]);

    // Handle clicking on a message to reply
    const handleReplyClick = (message) => {
        setReplyingTo(message); // Set the message to reply to
    };

    // Adjust the height of the textarea based on content
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) { // Check if textareaRef.current is not null
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    // Call adjustTextareaHeight whenever input changes
    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);

    // Display a placeholder message if no chat is selected
    if (!selectedChat) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Select a chat to start messaging
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Message list container */}
            <div className="flex-grow overflow-y-auto p-4 shadow rounded-lg bg-gradient-to-b from-blue-50 via-white to-blue-50">
                <div className="space-y-4">
                    {messageList.map((message, index) => (
                        <div
                            key={index}
                            className={`relative p-3 rounded-lg ${message.position === 'right' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-200 text-gray-800 self-start mr-auto'}`}
                            style={{
                                maxWidth: '70%',
                                wordBreak: 'break-word',
                                borderRadius: '15px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                marginBottom: '8px'
                            }}
                        >
                            {message.text}
                            {/* Optional: Add a small tail to the message bubble */}
                            <div className={`absolute ${message.position === 'right' ? 'right-0' : 'left-0'} bottom-0 w-0 h-0 border-t-8 ${message.position === 'right' ? 'border-t-blue-500' : 'border-t-gray-200'} border-l-8 border-r-8 border-b-0 border-transparent`} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Input field and send button container */}
            <div className="relative bg-white border-t border-gray-300 flex items-end p-2">
                {/* Wrapper for textarea and button positioning */}
                <textarea
                    ref={textareaRef}
                    placeholder="Type here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full resize-none px-4 py-2 pr-20 border border-gray-300 rounded-xl"
                    rows="1"
                    style={{ minHeight: '2.5rem', maxHeight: '10rem' }} // Adjust as needed
                />
                {/* Send button container */}
                <div className="absolute inset-y-0 right-0 flex items-end pb-2 pr-2">
                    {/* Send button positioned to the right of the scroll bar */}
                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 text-sm"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;
