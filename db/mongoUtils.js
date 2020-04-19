const mongoose = require('mongoose');

require('../models/device');
require('../models/deviceOps');

const Device = mongoose.model('Device');
const DeviceOps = mongoose.model('DeviceOps');

const { wait } = require('../lib/utils');
/**
 *
 *
 * @param {*} data
 * @returns promise
 */
async function insertDevice(data) {
  return await wait(Device.create, Device, data);
}
/**
 *
 *
 * @param {*} query
 * @param {*} select
 * @param {*} opts
 * @returns promise
 */
async function listDevices(query = {}, select = {}, opts = {}) {
  return await wait(Device.find, Device, query, select, opts);
}
/**
 *
 *
 * @param {*} uid
 * @returns
 */
async function deleteDevice(uid) {
  return await wait(Device.deleteOne, Device, { uid });
}
/**
 *
 *
 * @param {*} body
 * @returns
 */
async function insertDeviceOps(body) {
  return await wait(DeviceOps.create, DeviceOps, body);
}
/**
 *
 *
 * @param {*} uid
 * @returns
 */
async function getDevice(uid) {
  return await wait(Device.findOne, Device, { uid }, {}, { lean: true });
}

module.exports = {
  insertDevice,
  listDevices,
  deleteDevice,
  insertDeviceOps,
  getDevice
}