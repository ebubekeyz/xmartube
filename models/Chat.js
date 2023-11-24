const mongoose = require('mongoose')


const ChatSchema = new mongoose.Schema({
   message: {
    type: String
   },
   
   subscribe: {
    type: mongoose.Types.ObjectId,
    ref: 'Subscribe',
    required: true,
  },
  article: {
    type: mongoose.Types.ObjectId,
    ref: 'Article',
    required: true,
  }


},{ timestamps: true })

module.exports  = mongoose.model('Chat', ChatSchema)