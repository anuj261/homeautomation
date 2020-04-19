const _ = require('lodash');

const m = require('../responses/responses.json');

const { reply } = require('../lib/utils');
const { insertDevice, listDevices, deleteDevice, insertDeviceOps, getDevice } = require('../db/mongoUtils');
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function addDevice(req, res, next) {
  const body = req.body;

  const [err, device] = await insertDevice(body);
  if (err) {
    return reply(res, m.m102);
  }
  res.status(201).json(device);
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function getDevices(req, res, next) {
  const [err, devices] = await listDevices();
  if (err) {
    return reply(res, m.m102);
  }
  res.status(200).json({ devices });
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function removeDevice(req, res, next) {
  const uid = req.params.uid;
  const [err, resp] = await deleteDevice(uid);
  if (err) {
    return reply(res, m.m102);
  }
  res.status(201).json({ 'message': 'deviced removed!' });
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function addDeviceOps(req, res, next) {
  const body = req.body;
  const [err, dvcOps] = await insertDeviceOps(body);
  if (err) {
    return reply(res, m.m102);
  }
  res.status(200).json(dvcOps);
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function checkIfDeviceExists(req, res, next) {
  const uid = req.body.device_uid;
  const [err, device] = await getDevice(uid);
  if (err) {
    return reply(res, m.m102);
  }
  if (!device) {
    return reply(res, m.m103);
  }
  if (device.operations.indexOf(req.body.operation) === -1) {
    return reply(res, m.m104);
  }
  next();
}

module.exports = {
  addDevice,
  getDevices,
  removeDevice,
  addDeviceOps,
  checkIfDeviceExists
}