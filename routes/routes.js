//@ts-check
"use strict"

module.exports = () => {
  const express = require('express');
  const router = express.Router();

  const utility = require('../lib/utils');
  const device = require('../controller/device');

  const deviceDetailsSchema = require('../validators/deviceDetails');
  const deviceOpsSchema = require('../validators/deviceOps');

  router.get('/ping',
    utility.ping
  );

  router.post('/device',
    utility.authenicate,
    utility.validateBody(deviceDetailsSchema),
    device.addDevice
  );

  router.get('/devices',
    utility.authenicate,
    device.getDevices
  );

  router.post('/device/operation',
    utility.authenicate,
    utility.validateBody(deviceOpsSchema),
    device.checkIfDeviceExists,
    device.addDeviceOps
  );

  router.delete('/devices/:uid',
    utility.authenicate,
    device.removeDevice
  );

  router.all('*', (req, res) => {
    res.status(401).json({ error: 'Unauthorised access', code: 401 });
  });

  return router;
}
