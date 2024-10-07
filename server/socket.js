

export default function SocketLogic(io){
    io.on('connection',(socket)=>{

        console.log("A new User has Connected", socket.id);
 

        socket.on('chatMessage', (message) => {
            console.log("A new message was send", message)
            const formattedMessage = `${socket.id.slice(0, 5)} said: ${message}`
            io.emit('message',formattedMessage)
        })
        
        socket.on('disconnect',()=>{
            console.log('User Disconnected!')
        })
    })
}