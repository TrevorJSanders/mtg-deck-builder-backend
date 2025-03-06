const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: String,
  username: String,
  display_name: String,
  avatar: String,
  metadata: {
    team_name: String
  },
  is_owner: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;