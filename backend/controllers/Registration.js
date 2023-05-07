const Registration = require('../models/Registration');
const CustomError = require("../utilis/CustomError")

exports.createRegistration = async (req, res,next) => {
  const { name, email, phone, college, teamName, teamMembers, theme } = req.body;

if(!name){
  return(next(new CustomError("name is required",400)))
}
if(!email){
  return(next(new CustomError("email is required",400)))
}
if(!phone){
  return(next(new CustomError("phone is required",400)))
}
if(!college){
  return(next(new CustomError("college is required",400)))
}
if(!teamName){
  return(next(new CustomError("teamName is required",400)))
}
if(!teamMembers){
  return(next(new CustomError("teamMembers is required",400)))
}
if(!theme){
  return(next(new CustomError("theme is required",400)))
}

const user = await Registration.findOne({email});
console.log(user)
const team = await Registration.findOne({teamName});

if(user){
  return(next(new CustomError("email already rejistered",401)))
}

if(team){
  return(next(new CustomError("teamName already choosen please find other name",401)))
}
  // Generate uniqueId using current timestamp
  const teamId = `hackman${Date.now()}`;

  

  try {
   const registeration= await Registration.create({
      teamId,
      name,
      email,
      phone,
      college,
      teamName,
      teamMembers,
      theme
    });

    
    res.status(201).json({ message: 'Registration created successfully', registeration});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' ,err:err});
  }
};


exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', err:err });
  }
};