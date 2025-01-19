
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const studentSchema = new Schema({
    googleId:String,
    Name:String,
    age:String,
    status:String,
    Image:String
},{timestamps:true});


const Student = mongoose.model('student', studentSchema);

module.exports = Student;

