let io;

module.exports = {
  init:(server)=>{
    io= require('socket.io')(server,{
      cors:{origin:'*'}
    });

    io.on('connection',(socket)=>{
      console.log('user connected:', socket.id);
      socket.on('join',(userId)=>{
        socket.join(userId);
        console.log( `USer ${userId} joined room`)
      });
      socket.on('disconnect',()=>{
        console.log('user disconnected:',socket.id);
      });
    });

    return io;
  },

  getIO:()=>{
    if(!io){
      throw new Error('socket.io not initialized');
    }
    return io;
  }
};