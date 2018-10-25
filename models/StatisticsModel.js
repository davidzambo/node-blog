const mongoose = require('mongoose');
mongoose.connect(process.env.DB_ADDRESS, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const statisticSchema = new Schema({
    team: { type: String, required: true},
    season: { type: String, required: true },
    ageGroup: { type: String, required: true },
    league: { type: Number, required: true },
    win: { type: Number, required: true },
    draw: { type: Number, required: true },
    loss: { type: Number, required: true },
    finalPosition: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Statistics', statisticSchema);
