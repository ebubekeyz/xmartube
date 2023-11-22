const mongoose = require('mongoose')

const ViewsSchema = new mongoose.Schema({
     number: {
        type: String
     },
     article: {
        type: mongoose.Types.ObjectId,
        ref: 'Article',
        required: true,
      },

},{ timestamps: true })

module.exports  = mongoose.model('Views', ViewsSchema)