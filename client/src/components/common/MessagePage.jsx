import React, { useState, useEffect, useRef } from "react";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useCreateMessageMutation } from "@/redux/features/messages/messageApiSlice";
import io from "socket.io-client";
import ChatHeader from './ChatHeader'; // Import the ChatHeader component

const socket = io(import.meta.env.VITE_BACKEND_URL);

const MessagePage = ({ selectedChat, messages, currentUserId }) => {
	const [input, setInput] = useState("");
	const [messageList, setMessageList] = useState(messages);
	const [replyingTo, setReplyingTo] = useState(null);
	const textareaRef = useRef(null);

	const [createMessage] = useCreateMessageMutation();

	useEffect(() => {
		socket.on("message", (message) => {
			setMessageList((prevMessages) => [
				...prevMessages,
				{
					...message,
					position:
						message.sender._id === currentUserId ? "right" : "left",
				},
			]);
		});

		return () => {
			socket.off("message");
		};
	}, [currentUserId]);

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
			text: input,
			replyTo: replyingTo ? replyingTo._id : null,
		};

		try {
			const response = await createMessage({
				chat_id: selectedChat._id,
				...newMessage,
			}).unwrap();

			socket.emit("newMessage", {
				...newMessage,
				chat_id: selectedChat._id,
				_id: response._id,
				sender: { _id: currentUserId },
				position: "right",
			});

			setInput("");
			setReplyingTo(null);
		} catch (err) {
			console.error("Failed to send message:", err);
		}
	};

	useEffect(() => {
		setMessageList(messages);
	}, [selectedChat, messages]);

	const handleReplyClick = (message) => {
		setReplyingTo(message);
	};

	const adjustTextareaHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [input]);

	if (!selectedChat || !selectedChat._id) {
		return (
			<div className="flex items-center justify-center h-full text-gray-500">
				Select a chat to start messaging
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full bg-gray-50">
			<ChatHeader chatId={selectedChat._id} /> {/* Add the ChatHeader component */}
			<div className="flex-grow overflow-y-auto p-4 shadow rounded-lg bg-gradient-to-b from-blue-50 via-white to-blue-50">
				<div className="space-y-4">
					{messageList.length > 0 ? (
						messageList.map((message, index) => {
							const isRight = message.position === "right";
							const backgroundColor = isRight
								? "#3b82f6"
								: "#e5e7eb";
							return (
								<MessageBox
									key={index} // Ensure unique key
									position={message.position}
									type={"text"}
									text={message.text}
									date={new Date(
										message.createdAt
									).toLocaleString()}
									notch={true}
									reply={
										message.replyTo
											? { text: message.replyTo.text }
											: null
									}
									onReplyClick={() =>
										handleReplyClick(message)
									}
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
						<div className="text-gray-500">No messages yet</div>
					)}
				</div>
			</div>
			<div className="p-4 border-t border-gray-200 bg-white">
				<div className="flex items-center">
					<textarea
						ref={textareaRef}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						rows={1}
						placeholder="Type your message..."
						className="flex-grow p-2 border border-gray-300 rounded-md resize-none"
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								handleSend();
							}
						}}
					/>
					<button
						onClick={handleSend}
						className="ml-2 p-2 bg-blue-500 text-white rounded-md">
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default MessagePage;
