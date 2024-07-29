import { useAuthContext } from "../../context/AuthContext.jsx";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustang/useConversation";

// eslint-disable-next-line react/prop-types
const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	// Check if the message is from the current authenticated user
	const fromMe = message.senderId === authUser._id;

	// Format the message creation time
	const formattedTime = extractTime(message.createdAt);

	// Determine the chat alignment class based on the sender
	const chatClassName = fromMe ? "chat-end" : "chat-start";

	// Determine the profile picture to display
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic || "defaultProfilePicUrl"; // Provide a fallback URL

	// Determine the background color of the chat bubble
	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300"; // Provide a default background color for received messages

  const shakeClass = message.shouldShake ? "shake" : "";
	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img alt="Profile" src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor}  ${shakeClass}  pb-2`}>{message.message}</div>
			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
		</div>
	);
};

export default Message;
