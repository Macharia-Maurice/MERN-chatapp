import SideBar from "@/components/common/SideBar";
import MessagePage from "@/components/common/MessagePage";

const Home = () => {
	return (
		<div className="min-h-screen bg-gray-300 flex">
			<div className="w-full">
				<SideBar />
			</div>
			<div className="w-full">
				<MessagePage />
			</div>
		</div>
	);
};

export default Home;
