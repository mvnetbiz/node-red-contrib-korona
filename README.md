# node-red-contrib-korona

![KORONA](https://github.com/COMBASE/node-red-contrib-korona/docs/images/korona.svg)

With **KORONA.cloud Nodes** you can visually build fully featured Integration Flow's that Interact with the [KORONA.cloud](https://www.koronacloud.com/web) API v3 using [Node-RED](https://nodered.org/).
~~Almost~~ no coding skills required.

This uses [cloud-api-v3-js-client](https://www.npmjs.com/package/cloud-api-v3-js-client). Check it out for more info.

![Release](https://img.shields.io/npm/v/node-red-contrib-korona.svg)
![npm](https://img.shields.io/npm/dm/node-red-contrib-korona.svg)

![Nodes](https://github.com/COMBASE/node-red-contrib-korona/docs/images/nodes.png)

![Node Settings](https://github.com/COMBASE/node-red-contrib-korona/docs/images/node-settings.png)

## Documentation

1. [Nodes](https://github.com/COMBASE/node-red-contrib-korona/docs/ToDo_API-Features.md)
2. [Example Flow](#Example\ Flow)
3. [Changelog](https://github.com/COMBASE/node-red-contrib-chatbot/CHANGELOG.md)

## Getting started

First of all install [Node-RED](http://nodered.org/docs/getting-started/installation)

```shell
sudo npm install -g node-red
```

Then open  the user data directory  `~/.node-red`  and install the package

```shell
cd ~/.node-red
npm install node-red-contrib-chatbot
```

Then run

```shell
node-red
```

## Install

Run the following command in the root directory of your Node-RED install, usually
this is ~/.node-red .

```shell
npm install node-red-contrib-korona
```

## Usage

Provides Nodes to interact with the [KORONA.cloud APIv3](https://www.koronacloud.com/web/api/v3/swagger.json)

### Example Flow

![Example Flow](https://github.com/COMBASE/node-red-contrib-korona/docs/images/flow-receipts.png)

Dependencies:

- [node-red-contrib-combine](https://flows.nodered.org/node/node-red-contrib-combine)
- [node-red-contrib-korona](https://flows.nodered.org/node/node-red-contrib-korona)

Export some POS-Receipts

```json
[{"id":"7bc600db.bd40d","type":"debug","z":"8c6e1704.118468","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":970,"y":200,"wires":[]},{"id":"f10e6c69.51d8d","type":"debug","z":"8c6e1704.118468","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":970,"y":360,"wires":[]},{"id":"a431b3e0.969c6","type":"comment","z":"8c6e1704.118468","name":"Error Response","info":"","x":980,"y":320,"wires":[]},{"id":"b9f5c67d.79fec8","type":"comment","z":"8c6e1704.118468","name":"Response OK","info":"","x":970,"y":160,"wires":[]},{"id":"c04d9fde.7572c","type":"combine-statistic","z":"8c6e1704.118468","name":"","topic":"","operator":"len","defer":"1000","timeout":0,"distinction":"_msgid","x":960,"y":120,"wires":[["41713c9e.68fdf4"]]},{"id":"41713c9e.68fdf4","type":"bigstatus","z":"8c6e1704.118468","name":"Results","locale":"","show_date":false,"show_duration":false,"x":1140,"y":120,"wires":[[]]},{"id":"6acdde30.b552c","type":"combine-statistic","z":"8c6e1704.118468","name":"","topic":"","operator":"len","defer":"250","timeout":0,"distinction":"_msgid","x":960,"y":400,"wires":[["58a35fdf.2bd89"]]},{"id":"58a35fdf.2bd89","type":"bigstatus","z":"8c6e1704.118468","name":"Errors","locale":"","show_date":false,"show_duration":false,"x":1130,"y":400,"wires":[[]]},{"id":"f072b803.5734a8","type":"split","z":"8c6e1704.118468","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":830,"y":120,"wires":[["c04d9fde.7572c"]]},{"id":"5440e851.cf8ee8","type":"comment","z":"8c6e1704.118468","name":"GET","info":"","x":630,"y":160,"wires":[]},{"id":"3e214fe5.274d2","type":"inject","z":"8c6e1704.118468","name":"GET All","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":"","x":290,"y":200,"wires":[["4995db5c.070cc4"]]},{"id":"f781f6d7.1f8d58","type":"inject","z":"8c6e1704.118468","name":"STOP","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":"","x":290,"y":280,"wires":[["735da46b.10b76c"]]},{"id":"735da46b.10b76c","type":"change","z":"8c6e1704.118468","name":"reset","rules":[{"t":"move","p":"payload","pt":"msg","to":"reset","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":280,"wires":[["4995db5c.070cc4"]]},{"id":"d5539ca0.6fa72","type":"debug","z":"8c6e1704.118468","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":950,"y":440,"wires":[]},{"id":"7e9cd5a8.63b40c","type":"function","z":"8c6e1704.118468","name":"opts","func":"msg.opts = {\n\tsize: 10,\n\tsort: \"number\",\n\trevision: 0,\n\tpointOfSale: null,\n\torganizationalUnit: null,\n\tzCount: null,\n\tminCreateTime: null,\n\tmaxCreateTime: null\n}\nreturn msg;","outputs":1,"noerr":0,"x":430,"y":120,"wires":[["4995db5c.070cc4"]]},{"id":"4163bea0.87426","type":"inject","z":"8c6e1704.118468","name":"GO","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":"","x":290,"y":120,"wires":[["7e9cd5a8.63b40c"]]},{"id":"4995db5c.070cc4","type":"Receipts","z":"8c6e1704.118468","korona":"","name":"","action":"GET","rtype":"OBJECT","pagesize":200,"connections":5,"x":640,"y":200,"wires":[["f072b803.5734a8","7bc600db.bd40d","939254df.abf078"],["6acdde30.b552c","f10e6c69.51d8d","d5539ca0.6fa72"]]},{"id":"939254df.abf078","type":"debug","z":"8c6e1704.118468","name":"","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":950,"y":240,"wires":[]},{"id":"eb574fb4.012d3","type":"comment","z":"8c6e1704.118468","name":"Request with some Filter Options","info":"","x":370,"y":80,"wires":[]},{"id":"cce1d930.4cf738","type":"comment","z":"8c6e1704.118468","name":"Stop Current Requests","info":"","x":340,"y":240,"wires":[]},{"id":"b096b816.da2d18","type":"comment","z":"8c6e1704.118468","name":"Request all Receipts","info":"","x":330,"y":160,"wires":[]}]
```