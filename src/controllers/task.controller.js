const Task = require('../models/Task.model');
const socket = require('../socket');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.id });
    socket.getIO().to(task.assignedTo?.toString()).emit('taskCreated', task);
    return res.status(201).json({message:'task created successfully',error:false,task:task});
  } catch (error) {
    res.status(500).json({message:error.message, error:true});
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { search, status, priority, sortBy = 'createdAt', order = 'desc' } = req.query;
    const userRole = req.user.roles;
    const filters = userRole === 'USER' ? { assignedTo: req.user.id } : {};
    if (search) {
      filters.$text = { $search: search };
    }
    if (status) {
      filters.status = status;
    }
    if (priority) {
      filters.priority = priority;
    }
    const sortOrder = order === 'asc' ? 1 : -1;
    const tasks = await Task.find(filters).sort({ [sortBy]: sortOrder });
    return res.status(200).json({message:'tasks fetched successfully',error:false,tasks:tasks});
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    socket.getIO().to(task.assignedTo?.toString()).emit('taskUpdated', req.task);
    return res.json({ message: 'Task update successfully', error: false , task:task});
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    await req.task.deleteOne();
    socket.getIO().to(task.assignedTo?.toString()).emit('taskDeleted', { taskId: req.task._id });
    return res.status(200).json({ message: 'Task deleted successfully', error:false });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.assignedTo = req.body.userId;
    await task.save();
    return res.status(200).json({ message: 'Task assigned successfully', error: false, task: task });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};
