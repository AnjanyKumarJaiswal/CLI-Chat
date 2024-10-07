import { Chat , User } from "./models/chat.schema.js";

export default function SocketLogic(io){
    io.on('connection',(socket)=>{

        console.log("A new User has Connected", socket.id);
 
        socket.on('loadMessages', async (chatId) => {
          try {
            const chat = await Chat.findById(chatId).populate('log.by', 'displayName');
            if (chat) {
              chat.log.forEach(message => {
                socket.emit('chatMessage', {
                  Messagetext: message.message,
                  user: { displayName: message.by.displayName },
                  sent: message.sent 
                });
              });
            }
          } catch (err) {
            console.error(err);
          }
        });

        socket.on('chatMessage', async ({ googleId, chatId, Messagetext }) => {
            try {
                const user = await User.findById(googleId); // Find by googleId 
                if (!user) { 
                    return console.log("User not found");
                }

                const chat = await Chat.findById(chatId); 
                if (!chat) { 
                    return console.log("Chat not found");
                }

                console.log(`UserID: ${user.googleId}, ChatID: ${chat._id}, Message: ${Messagetext}`);
                if (chat) {
                    chat.log.push({
                        by: user._id, 
                        message: Messagetext,
                        sent: new Date()
                    });
                    chat.updatedAt = new Date();
                    await chat.save();
                }
                socket.to(chatId.toString()).emit('chatMessage', { 
                    Messagetext,
                    user: { displayName: user.displayName },
                    sent: new Date()
                });

            } catch (err) {
                console.error(err);
            }
        })
        
        socket.on('disconnect',()=>{
            console.log('User Disconnected!')
        })
    })
}