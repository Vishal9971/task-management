const Task = require('../models/Task.model');

module.exports = async (req,res,next)=>{
  const task = await Task.findById
  (req.params.id);

  if(!task){
    return res.status(404).json({
      message:'Task not Found',
    })
  }

  if(req.user.roles.includes('ADMIN')){
    req.task = task;
    return next();
  }

  if(task.createdBy.toString()!== req.user.id){
    return res.status(403).json({
      message:'Not allowed',
    })
  }

  req.task = task;
  next();
}