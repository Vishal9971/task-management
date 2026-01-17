const Task = require('../models/Task.model');

exports.getTaskAnalytics = async(req,res)=>{
  // const userId = req.user.id;
  // const roles = req.user.roles;

  // let matchCondition={};

  // if(roles.includes('USER')&& roles.includes('ADMIN')){
  //   matchCondition.assignedTo = userId;
  // }


  const completed = await Task.countDocuments({
    status:'COMPLETED'});
  const pending = await Task.countDocuments({
    status:'PENDING'});
  const overdue = await Task.countDocuments({
    status:'PENDING',
    dueDate:{$lt: new Date()}});

  res.json({completed,pending,overdue});
};

