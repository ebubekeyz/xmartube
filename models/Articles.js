const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
      title: {
        type: String,
      },

      video: {
        type: String,
      },
      image: {
        type: String,
      },

      category: {
        type: String,
        required: [true, 'Please provide category'],
        enum: ['sport', 'science', 'adventure', 'entertainment', 'politics'],
      },
      tag: {
        type: String,
        enum: ['adventure', 'travel', 'lifestyle', 'documentary', 'tutorials', 'beautytips', 'creativity', 'storytelling', 'scenes'],
      },

      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },

},{ timestamps: true })

module.exports  = mongoose.model('Article', ArticleSchema)