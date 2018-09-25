Grafana Alert Webhook MQTT
=====

This tool forwards alerts from NEEO to a MQTT broker.

Setup
-----

Copy the sample configuration file and adjust it:

```
$ cp config.sample.json config.json
```

Install the dependencies:

```
$ npm install
```

Running locally
-----

```
$ DEBUG=mk:* npm start
```

Run in production
-----

```
$ npm install
$ npm start
```