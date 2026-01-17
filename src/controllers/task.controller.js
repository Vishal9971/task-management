const Task = require('../models/Task.model');
const socket = require('../socket');

exports.createTask = async(req,res)=>{
  try{
  const task = await Task.create({...req.body,createdBy:req.user.id});
  socket.getIO().to(task.assignedTo.toString()).emit('taskCreated',task);
  res.status(201).json(task);
}catch(error){
  res.status(401).json(error.message);
}
};

exports.getTasks = async(req,res)=>{

  try{
    const {search,status,priority,sortBy='createdAt', order='desc'} = req.query;
     const filters = {};
     if(search){
      filters.$text = {$search:search}
     }
  if(status){
    filters.status = status;
  }
  if(priority){
    filters.priority = priority;
  }
  const sortOrder = order=== 'asc'?1:-1;
  const tasks = await Task.find(filters).sort({[sortBy]:sortOrder});
  res.json(tasks);
}catch(error){
  res.status(500).json({
    message:error.message,
    error:true
  })
}
};

exports.updateTask = async (req,res)=>{
  const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true});
  socket.getIO().to(task.assignedTo.toString()).emit('taskUpdated',req.task);
  res.json(task);
}
exports.deleteTask = async(req,res)=>{
  await req.task.deleteOne();
  socket.getIO().emit('taskDeleted',{taskId: req.task._id});
  res.json({message:'Task deleted successfully'});
}

exports.assignTask = async(req,res)=>{
  const task = await Task.findById(req.params.id);
  task.assignedTo=req.body.userId;
  await task.save();
  res.json(task);
}