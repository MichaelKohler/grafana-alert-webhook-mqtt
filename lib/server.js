'use strict';

const debug = require('debug')('mk:grafana-alert-webhook-mqtt:server');
const express = require('express');
const bodyParser = require('body-parser');

const mqtt = require('./mqtt');

const ALERT_TYPES = ['alerting', 'no_data'];

module.exports = {
  start,
};

function start() {
  const app = express();
  app.use(bodyParser.json())

  app.post('/', (req, res) => {
    const state = req.body.state;
    const alerting = ALERT_TYPES.includes(state);
    mqtt.forwardAlarm(alerting);
    res.send({});
  });

  const server = app.listen(9999, () => {
    const host = server.address().address;
    const port = server.address().port;

    debug(`Example app listening at http://${host}:${port}`);
  });
}

