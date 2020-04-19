const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { v4 } = require('uuid');

const schema = new Schema({
  uid: { type: String },
  name: { type: String },
  operations: { type: [] },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.pre('save', function (next) {
  this.uid = `dvc-${v4()}`;
  next();
});

module.exports = mongoose.model('Device', schema);
