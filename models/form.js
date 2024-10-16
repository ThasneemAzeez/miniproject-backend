const  Mongoose  = require("mongoose");


const userSchema = Mongoose.Schema({
  "name": {
    type: String,
    required: false,
    trim: true
  },
  "description": {
    type: String,
    required: false,
    trim: true
  },
  "date": {
    type: Date,
    required: true
  },
  "location": {
    type: String,
    required: false,
    trim: true
  },
  "poster": {
    type: Buffer, // Store the PDF data as a Buffer
    required: false
  },
  "images": [
    {
      type: Buffer // Store each image data as a Buffer
    }
  ]
});

let formModel  = Mongoose.model('Event', userSchema);
module.exports = formModel