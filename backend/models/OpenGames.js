const mongoose = require('mongoose');

const { Schema } = mongoose;

const OpenGameSchema = new Schema({
  players: {player1: String, player1Color: String, player2: String, player2Color: String},
  startDate: { type: Date, default: Date.now },
  timeToGo: Number,
  moves: [{from: String, to: String}],
  chat: [{player: String, message: String}]
});

OpenGameSchema.methods.toJSON = function() {
    return {
      id: this._id,
      players: this.players,
      startDate: this.startDate,
      timeToGo: this.timeToGo,
      moves: this.moves,
      chat: this.chat
    };
};

OpenGameSchema.index({ players: 1, startDate: -1 });

mongoose.model('OpenGame', OpenGameSchema);