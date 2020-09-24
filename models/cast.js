
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dbase0'
    },
    
    cast: {
        type: [String],
        required: true
    },
    
}, { autoCreate : true })


module.exports = mongoose.model('cast', ProfileSchema);