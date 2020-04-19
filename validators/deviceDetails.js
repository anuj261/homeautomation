//@ts-check
"use strict";

const schema = require('validate');

module.exports = schema({
  name: {
    type: 'string',
    required: true,
    message: 'name is required'
  },
  operations: {
    type: 'array',
    required: true,
    message: 'operations is required'
  }
});