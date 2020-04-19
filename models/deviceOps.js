const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { v4 } = require('uuid');

const schema = new Schema({
  uid: { type: String },
  device_uid: { type: String },
  operation: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.pre('save', function (next) {
  this.uid = `dvc-ops-${v4()}`;
  next();
});

module.exports = mongoose.model('DeviceOps', schema);
