module.exports = function (RED) {
  'use strict';

  var koronaHelper = require("../lib/korona.js");
  var KoronacloudApiV3 = require('cloud-api-v3-js-client');

  function ReceiptsAPI(config) {

    // Config SETUP
    RED.nodes.createNode(this, config);
    this.korona = config.korona;
    this.action = config.action;
    this.type = "Receipt";
    this.rtype = config.rtype;
    this.pagesize = config.pagesize;
    this.connections = config.connections;

    var korona = {
      token: RED.nodes.getNode(config.korona).credentials.token,
      username: RED.nodes.getNode(config.korona).credentials.username,
      password: RED.nodes.getNode(config.korona).credentials.password,
      url: RED.nodes.getNode(config.korona).credentials.url
    };

    // Node Setup
    this.status({});
    var context = this.context();
    var node = this;

    // ON Input Message
    node.on('input', function (msg) {
      // API Setup
      var defaultClient = KoronacloudApiV3.ApiClient.instance;
      var basicAuth = defaultClient.authentications['basicAuth'];
      basicAuth.username = korona.username;
      basicAuth.password = korona.password;
      defaultClient.basePath = korona.url;

      // if queue doesn't exist, create it
      context.object_queue = context.object_queue || [];
      context.page_queue = context.page_queue || [];
      context.processed = context.processed || 0;
      context.busy_connections = context.busy_connections || 0;
      context.reset = false;

      // if the msg is a reset, clear queue
      if (msg.hasOwnProperty('reset')) {
        context.object_queue = [];
        context.page_queue = [];
        context.processed = 0;
        context.busy_connections = 0;
        context.reset = true;
        return;
      }

      // Reset process context on new msg if queue is empty
      if (context.page_queue.length <= 0) {
        context.processed = 0;
      }

      koronaHelper.proccessNodeAct(node, msg, korona);

    }); // END of - ON Input

    node.on('close', function () {
      // Update status
      node.status({
        fill: 'green',
        shape: 'ring',
        text: 'ready'
      });
      // Reset Context
      context.page_queue = [];
      context.processed = 0;
      context.busy_connections = 0;
    });
  }

  RED.nodes.registerType('Receipts', ReceiptsAPI);
};