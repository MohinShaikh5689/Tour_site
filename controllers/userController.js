const catchAsync = require("../utils/catchAsync");
const User = require('../models/userModel');
const AppError = require("../utils/appError");
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getMe = (req,res,next)=>{
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);


exports.updateMe = catchAsync(async(req,res,next)=>{


  //1)  Create error if user POSTs password data
  if(req.body.password || req.body.passwordConfirm){
    return(next(new AppError('This route is not for password updates. Please use /updateMyPassword to update password',400)));
  }

  //2)  Update user document
  const filteredBody = filterObj(req.body,'name','email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id,filteredBody);
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });

});

exports.deleteMe = catchAsync(async(req,res,next)=>{
  await User.findByIdAndUpdate(req.user.id,{active: false});

  res.status(204).json({
    status: 'success',
    data: null
  });
});



exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
