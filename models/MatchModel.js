const mongoose = require('mongoose');

module.exports = {
    Schema = mongoose.Schema,

    matchSchema = new Schema({
        team: { type: String, required: true },
        date: { type: Date },
        address: { type: String },
        goals: {
            shot: Number,
            get: Number
        },
        league: Number,
        ageGroup: String,
    }),

    Match = mongoose.model('Match', matchSchema),


}