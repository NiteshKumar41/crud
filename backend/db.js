const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crudDb ',(err)=>{
if (err) throw err;
console.log('connected');
})

module.exports = mongoose;