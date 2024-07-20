import React from "react";
import { useProfileMeQuery } from "@/redux/features/profiles/profileApiSlice";
import { ChatItem } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const SideBar = () => {
	const { data, error, isLoading } = useProfileMeQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error loading profile</div>;
	}
	const { userProfile } = data;
	const { profilePicture, bio, user } = userProfile;
	const { first_name, last_name, email } = user;

	return (
			<ChatItem
				className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
				avatar={`http://localhost:2000/${profilePicture}`}
				alt={"profile_pic"}
				title={first_name}
				subtitle={"What are you doing?"}
				date={new Date()}
				unread={2}
			/>

	);
};

export default SideBar;
