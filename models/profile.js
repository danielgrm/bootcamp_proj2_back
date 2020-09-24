const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        },
        company: {
            type: String,
          },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },


    }, { autoCreate : true })

module.exports = mongoose.model('profiledb', ProfileSchema)
