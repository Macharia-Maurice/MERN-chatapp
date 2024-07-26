import React, { useState, useEffect, useRef } from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useCreateMessageMutation } from "@/redux/features/messages/messageApiSlice";

const MessagePage = ({ selectedChat, messages }) => {
    const [input, setInput] = useState("");
    const [messageList, setMessageList] = useState(messages);
    const [replyingTo, setReplyingTo] = useState(null);
    const textareaRef = useRef(null);

    const [createMessage] = useCreateMessageMutation();

    // Log selectedChat and messages for debugging
    useEffect(() => {
        console.log("Selected Chat:", selectedChat);
        console.log("Messages:", messages);
    }, [selectedChat, messages]);

    // Handle sending a new message
    const handleSend = async () => {
        if (!selectedChat || !selectedChat._id) {
            console.error("No chat selected.");
            return;
        }

        if (input.trim() === "") {
            console.error("Input is empty.");
            return;
        }

        const newMessage = {
            type: "text",
            text: input,
            replyTo: replyingTo ? replyingTo._id : null,
        };

        try {
            const response = await createMessage({
                chat_id: selectedChat._id,
                ...newMessage,
            }).unwrap();
            setMessageList((prevMessages) => [
                ...prevMessages,
                {
                    ...newMessage,
                    _id: response._id, // Add _id from response
                    sender: { _id: 'currentUserId' }, // Update as needed
                    position: 'right' // This is for the current user, adjust as needed
                },
            ]);
            setInput("");
            setReplyingTo(null); // Clear reply state after sending
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    // Update message list when selected chat or messages change
    useEffect(() => {
        setMessageList(messages);
    }, [selectedChat, messages]);

    // Handle clicking on a message to reply
    const handleReplyClick = (message) => {
        setReplyingTo(message);
    };

    // Adjust the height of the textarea based on content
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    // Call adjustTextareaHeight whenever input changes
    useEffect(() => {
        adjustTextareaHeight();
    }, [input]);

    // Display a placeholder message if no chat is selected
    if (!selectedChat || !selectedChat._id) {
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
                    {messageList.length > 0 ? (
                        messageList.map((message) => {
                            console.log("Rendering Message:", message);
                            const isRight = message.position === 'right'; // Use the position property from message
                            const backgroundColor = isRight ? "#3b82f6" : "#e5e7eb";
                            return (
                                <MessageBox
                                    key={message._id}
                                    position={message.position} // Use the position property from message
                                    type={"text"}
                                    text={message.text} // Ensure text is properly set
                                    date={new Date(message.createdAt).toLocaleString()} // Format date as needed
                                    notch={true}
                                    reply={message.replyTo ? { text: message.replyTo } : null}
                                    onReplyClick={() => handleReplyClick(message)}
                                    styles={{
                                        backgroundColor: backgroundColor,
                                        color: isRight ? "#fff" : "#000",
                                        borderRadius: "0.75rem",
                                        padding: "0.75rem",
                                        maxWidth: "75%",
                                    }}
                                    notchStyle={{
                                        fill: backgroundColor,
                                        width: "29px",
                                        height: "29px",
                                        position: "absolute",
                                        bottom: "-10px",
                                        [isRight ? "right" : "left"]: "-5px",
                                        transform: isRight
                                            ? "rotate(1deg)"
                                            : "rotate(-2deg)",
                                        clipPath: isRight
                                            ? "polygon(0 0, 100% 0, 100% 100%)"
                                            : "polygon(0 0, 0 100%, 100% 0)",
                                    }}
                                />
                            );
                        })
                    ) : (
                        <div className="text-gray-500">No messages to display</div>
                    )}
                </div>
            </div>
            {/* Input field and send button container */}
            <div className="relative bg-white border-t border-gray-300 flex items-center p-2">
                <textarea
                    ref={textareaRef}
                    placeholder="Type here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full resize-none px-4 py-2 pr-20 border border-gray-300 rounded-xl"
                    rows="1"
                    style={{ minHeight: "2.5rem", maxHeight: "10rem" }}
                />
                {/* Send button */}
                <button
                    onClick={handleSend}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-sm">
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessagePage;
