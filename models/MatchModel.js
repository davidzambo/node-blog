const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS);
const Schema = mongoose.Schema;


const matchSchema = new Schema({
        team: {type: String, required: true},
        vsTeam: {type: String, required: true},
        matchDate: {type: Date },
        city: {type: String, required: true},
        address: {type: String},
        league: Number,
        ageGroup: String,
        createdAt: {type: Date, default: Date.now }
    });

module.exports = mongoose.model('Match', matchSchema);


