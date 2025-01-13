import User from "../models/user.model.js";
import Message from "../models/message.model.js";
    export const getUserForSidebar = async ()=>{
        try{
            const loggedInUserId = req.user._id;
            const filterUser = await User.findById({_id:{$ne:loggedInUserId}}).select('-password');
            //we find all the users other than the current user {LIke the friends of the user}
            res.status(200).json(filterUser);
        }
        catch(err){
            res.status(500).json({message:err.message});
            console.log("Error in getUserForSidebar:",err.message);

        }
        
    }

    export const getMessage = async (req, res) =>{
        try {
            const {id:userToChatId }= req.params; // receiver id
            const senderId = req.user_id; // my id
            const messages = await Message.find({
                $or:[
                    {senderId:senderId, receiverId:userToChatId},
                    {senderId:userToChatId, receiverId:senderId}
                ] // this is the array of messages
            })
            res.status(200).json(messages);
        } 
        catch (error) {
            console.error("Error in getMessage:", error.message);
            res.status(500).json({ message: "Server Error" });
            
        }
    }

    export const sendMessage = async (req,res) =>{
        try {
            const {text, image} = req.body;
            const{id:receiverId}= req.params;
            const senderId = req.user_id;

            let imageUrl;
            if(image){
                // If the image is provided by the user then we upload it to the cloudinary
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;

                const newMessage = new Message({
                    senderId,
                    receiverId, 
                    text,
                    image:imageUrl
                });
                await newMessage.save();

                // Realtime functionality goes here
                res.status(201).json({newMessage})
            }
            
        } catch (error) {
            console.error("Error in sendMessage controller:", error.message);
            res.status(500).json({ message: "Server Error" });
            
        }
    };