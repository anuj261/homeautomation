//@ts-check
"use strict";

const schema = require('validate');

module.exports = schema({
  device_uid: {
    type: 'string',
    required: true,
    message: 'device_uid is required'
  },
  operation: {
    type: 'string',
    required: true,
    message: 'operation is required'
  }
});