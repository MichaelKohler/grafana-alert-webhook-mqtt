'use strict';

const debug = require('debug')('mk:grafana-alert-webhook-mqtt:mqtt');
const MQTT = require('mqtt');

let mqttReady = false;
let config;

try {
  config = require('../config.json');
} catch(err) {
  console.error('NO_CONFIG_FOUND');
  process.exit(1);
}

module.exports = {
  forwardAlarm,
};

const { username, password, url } = config.mqtt;
let mqttOptions = {};

if (username && password) {
  mqttOptions = {
    username,
    password,
  };
}

debug('Creating client for ..', url);
const client = MQTT.connect(url, mqttOptions);

client.on('connect', () => {
  debug('MQTT_CLIENT_CONNECTED');
  mqttReady = true;
});

client.on('error', (error) => {
  console.log(error);
});

function forwardAlarm(value) {
  if (!mqttReady) {
    return;
  }

  const topic = config.mqtt.topic;
  const stringifiedValue = `${value}`;

  debug('Publishing', topic, stringifiedValue);
  client.publish(topic, stringifiedValue);
}