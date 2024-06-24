import conversation from "../models/conversation.model.js";
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js";
export const sendMessage=async (req,res) =>{

try {
   const {message}=req.body;
   const {id:receiverId}=req.params
   const senderId=req.user._id;
   
   //find if the conversation has been done bfore or not
   const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if(!conversation){
    conversation=await Conversation.create({

      participants:[senderId,receiverId]
    })
  }

  const newMessage=new Message ({

     senderId:senderId,
     receiverId:receiverId,
     message:message
    

  });

  if(newMessage){
    conversation.message.push(newMessage._id);
  }

  await Promise.all([conversation.save(),newMessage.save()]);
  res.status(201).json(newMessage);
} catch (error) {
    res.status(500).json({ error: error.message });
}

};

export const getMessage=async (req,res)=>{
try {
  const {id:userToChatId}=req.params;
const senderId=req.user._id;

const conversation=await Conversation.findOne({

participants:{$all:[senderId,userToChatId]},

}).populate("message")


if(!conversation){

  return res.status(401).json([]);
}

const message=conversation.message;

res.status(200).json(message);
}
catch (error) {
  console.log("Error in getMessage ",error);
    res.status(500).json({ error: error.message });

}
};