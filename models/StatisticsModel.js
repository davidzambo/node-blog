const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/trd');
const Schema = mongoose.Schema;

const statisticSchema = new Schema({
    season: { type: String, required: true },
    ageGroup: { type: String, required: true },
    league: { type: Number, required: true },
    win: { type: Number, required: true },
    draw: { type: Number, required: true },
    loss: { type: Number, required: true },
    position: { type: Number, required: true },
});

module.exports = mongoose.model('Statistic', statisticSchema);
