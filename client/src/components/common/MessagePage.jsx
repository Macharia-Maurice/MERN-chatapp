import React, { useState, useEffect, useRef } from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const MessagePage = ({ selectedChat, messages }) => {
	const [input, setInput] = useState("");
	const [messageList, setMessageList] = useState(messages);
	const [replyingTo, setReplyingTo] = useState(null);
	const textareaRef = useRef(null);

	// Handle sending a new message
	const handleSend = () => {
		if (input.trim() !== "") {
			const newMessage = {
				position: "right",
				type: "text",
				text: input,
				date: new Date(),
				reply: replyingTo
					? {
							photoURL: replyingTo.avatar,
							title: replyingTo.title,
							message: replyingTo.text,
					  }
					: null,
			};

			setMessageList((prevMessages) => [...prevMessages, newMessage]);
			setInput("");
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
		if (textarea) {
			// Check if textareaRef.current is not null
			textarea.style.height = "auto";
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
					{messageList.map((message, index) => {
						const isRight = message.position === "right";
						const backgroundColor = isRight ? "#3b82f6" : "#e5e7eb";
						return (
							<MessageBox
								key={index}
								position={message.position}
								type={message.type}
								text={message.text}
								date={message.date}
								notch={true}
								reply={message.reply}
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
									width: " 29 px",
									height: "29 px",
									position: "absolute",
									bottom: "-10px",
									[isRight ? "right" : "left"]: "-10px",
									transform: isRight
										? "rotate(1deg)"
										: "rotate(-2deg)",
									clipPath: isRight
										? "polygon(0 0, 100% 0, 100% 100%)"
										: "polygon(0 0, 0 100%, 100% 0)",
								}}
							/>
						);
					})}
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
