# node-red-contrib-korona

![KORONA](https://raw.githubusercontent.com/COMBASE/node-red-contrib-korona/master/docs/images/korona.svg)

With **KORONA.cloud Nodes** you can visually build fully featured Integration Flow's that Interact with the [KORONA.cloud](https://www.koronacloud.com/web) API v3 using [Node-RED](https://nodered.org/).
~~Almost~~ no coding skills required.

This uses [cloud-api-v3-js-client](https://www.npmjs.com/package/cloud-api-v3-js-client). Check it out for more info.

![Release](https://img.shields.io/npm/v/node-red-contrib-korona.svg)
![npm](https://img.shields.io/npm/dm/node-red-contrib-korona.svg)

![Nodes](https://raw.githubusercontent.com/COMBASE/node-red-contrib-korona/master/docs/images/nodes.png)

![Node Settings](https://raw.githubusercontent.com/COMBASE/node-red-contrib-korona/master/docs/images/node-settings.png)

## Documentation

1. [Nodes](https://raw.githubusercontent.com/COMBASE/node-red-contrib-korona/master/docs/ToDo_API-Features.md)
2. [Examples](README.md#Examples)
3. [Changelog](https://raw.githubusercontent.com/COMBASE/node-red-contrib-korona/master/CHANGELOG.md)

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

## Examples

### 1st Example - Export Product's to a CSV File

```json
[{"id":"33ad28e6.aee8","type":"Products","z":"5c2a7df1.7ee7b4","korona":"","name":"","action":"GET","rtype":"OBJECT","pagesize":200,"connections":"5","x":420,"y":240,"wires":[["d1101e9d.933078","c05480df.fa283","8fae69e2.ad64f8"],["ea7f417.9fd45c","1f3af244.fe63de"]]},{"id":"4e4e6a0f.5184a4","type":"inject","z":"5c2a7df1.7ee7b4","name":"GET All","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":"","x":130,"y":240,"wires":[["33ad28e6.aee8"]]},{"id":"44a70645.b202c8","type":"inject","z":"5c2a7df1.7ee7b4","name":"STOP","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":"","x":130,"y":320,"wires":[["8540a4ee.9806f8"]]},{"id":"8540a4ee.9806f8","type":"change","z":"5c2a7df1.7ee7b4","name":"reset","rules":[{"t":"move","p":"payload","pt":"msg","to":"reset","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":270,"y":320,"wires":[["33ad28e6.aee8"]]},{"id":"257c3f9b.e26fa8","type":"comment","z":"5c2a7df1.7ee7b4","name":"Stop Current Requests","info":"","x":180,"y":280,"wires":[]},{"id":"1f013ff4.cd7e3","type":"comment","z":"5c2a7df1.7ee7b4","name":"Request all Products","info":"","x":170,"y":200,"wires":[]},{"id":"7fc29cd5.6ded8c","type":"csv","z":"5c2a7df1.7ee7b4","name":"","sep":",","hdrin":"","hdrout":true,"multi":"one","ret":"\\n","temp":"name,number,firstprice,listed","skip":"0","x":930,"y":240,"wires":[["7ae75e16.d90b38"]]},{"id":"c05480df.fa283","type":"debug","z":"5c2a7df1.7ee7b4","name":"","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":630,"y":140,"wires":[]},{"id":"ea7f417.9fd45c","type":"debug","z":"5c2a7df1.7ee7b4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":630,"y":400,"wires":[]},{"id":"be761bc6.7bade","type":"comment","z":"5c2a7df1.7ee7b4","name":"Error Response","info":"","x":640,"y":360,"wires":[]},{"id":"23e62d38.5ccbf2","type":"comment","z":"5c2a7df1.7ee7b4","name":"Response OK","info":"","x":630,"y":100,"wires":[]},{"id":"1f3af244.fe63de","type":"debug","z":"5c2a7df1.7ee7b4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":610,"y":440,"wires":[]},{"id":"d1101e9d.933078","type":"debug","z":"5c2a7df1.7ee7b4","name":"","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":610,"y":180,"wires":[]},{"id":"8fae69e2.ad64f8","type":"split","z":"5c2a7df1.7ee7b4","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":610,"y":240,"wires":[["eb0e4e88.eeff1"]]},{"id":"6e522dce.6f7c6c","type":"function","z":"5c2a7df1.7ee7b4","name":"opts","func":"msg.opts = {\n    page: 1,\n\tsize: 5, \n\tsort: \"number\",\n\trevision: 0, \n\tincludeDeleted: false,\n\tproductCodes: null,\n\tcommodityGroup: null,\n\tassortment: null,\n\ttag: null\n}\nreturn msg;","outputs":1,"noerr":0,"x":270,"y":160,"wires":[["33ad28e6.aee8"]]},{"id":"152a43d5.0dc1fc","type":"inject","z":"5c2a7df1.7ee7b4","name":"GO","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":"","x":130,"y":160,"wires":[["6e522dce.6f7c6c"]]},{"id":"7ae75e16.d90b38","type":"file","z":"5c2a7df1.7ee7b4","name":"","filename":"products.cvs","appendNewline":false,"createDir":true,"overwriteFile":"false","x":1090,"y":240,"wires":[]},{"id":"eb0e4e88.eeff1","type":"change","z":"5c2a7df1.7ee7b4","name":"get firstprice","rules":[{"t":"move","p":"payload.prices[0].value","pt":"msg","to":"payload.firstprice","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":770,"y":240,"wires":[["7fc29cd5.6ded8c"]]}]
```

### 2nd Example of KORONA Node Options

![Example2](https://raw.githubusercontent.com/COMBASE/node-red-contrib-korona/master/docs/images/flow-receipts.png)

Dependencies:

- [node-red-contrib-combine](https://flows.nodered.org/node/node-red-contrib-combine)

Export some POS-Receipts

```json
[{"id":"7bc600db.bd40d","type":"debug","z":"8c6e1704.118468","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":970,"y":200,"wires":[]},{"id":"f10e6c69.51d8d","type":"debug","z":"8c6e1704.118468","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":970,"y":360,"wires":[]},{"id":"a431b3e0.969c6","type":"comment","z":"8c6e1704.118468","name":"Error Response","info":"","x":980,"y":320,"wires":[]},{"id":"b9f5c67d.79fec8","type":"comment","z":"8c6e1704.118468","name":"Response OK","info":"","x":970,"y":160,"wires":[]},{"id":"c04d9fde.7572c","type":"combine-statistic","z":"8c6e1704.118468","name":"","topic":"","operator":"len","defer":"1000","timeout":0,"distinction":"_msgid","x":960,"y":120,"wires":[["41713c9e.68fdf4"]]},{"id":"41713c9e.68fdf4","type":"bigstatus","z":"8c6e1704.118468","name":"Results","locale":"","show_date":false,"show_duration":false,"x":1140,"y":120,"wires":[[]]},{"id":"6acdde30.b552c","type":"combine-statistic","z":"8c6e1704.118468","name":"","topic":"","operator":"len","defer":"250","timeout":0,"distinction":"_msgid","x":960,"y":400,"wires":[["58a35fdf.2bd89"]]},{"id":"58a35fdf.2bd89","type":"bigstatus","z":"8c6e1704.118468","name":"Errors","locale":"","show_date":false,"show_duration":false,"x":1130,"y":400,"wires":[[]]},{"id":"f072b803.5734a8","type":"split","z":"8c6e1704.118468","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":830,"y":120,"wires":[["c04d9fde.7572c"]]},{"id":"5440e851.cf8ee8","type":"comment","z":"8c6e1704.118468","name":"GET","info":"","x":630,"y":160,"wires":[]},{"id":"3e214fe5.274d2","type":"inject","z":"8c6e1704.118468","name":"GET All","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":"","x":290,"y":200,"wires":[["4995db5c.070cc4"]]},{"id":"f781f6d7.1f8d58","type":"inject","z":"8c6e1704.118468","name":"STOP","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":"","x":290,"y":280,"wires":[["735da46b.10b76c"]]},{"id":"735da46b.10b76c","type":"change","z":"8c6e1704.118468","name":"reset","rules":[{"t":"move","p":"payload","pt":"msg","to":"reset","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":430,"y":280,"wires":[["4995db5c.070cc4"]]},{"id":"d5539ca0.6fa72","type":"debug","z":"8c6e1704.118468","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":950,"y":440,"wires":[]},{"id":"7e9cd5a8.63b40c","type":"function","z":"8c6e1704.118468","name":"opts","func":"msg.opts = {\n\tsize: 10,\n\tsort: \"number\",\n\trevision: 0,\n\tpointOfSale: null,\n\torganizationalUnit: null,\n\tzCount: null,\n\tminCreateTime: null,\n\tmaxCreateTime: null\n}\nreturn msg;","outputs":1,"noerr":0,"x":430,"y":120,"wires":[["4995db5c.070cc4"]]},{"id":"4163bea0.87426","type":"inject","z":"8c6e1704.118468","name":"GO","topic":"","payload":"","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":"","x":290,"y":120,"wires":[["7e9cd5a8.63b40c"]]},{"id":"4995db5c.070cc4","type":"Receipts","z":"8c6e1704.118468","korona":"","name":"","action":"GET","rtype":"OBJECT","pagesize":200,"connections":5,"x":640,"y":200,"wires":[["f072b803.5734a8","7bc600db.bd40d","939254df.abf078"],["6acdde30.b552c","f10e6c69.51d8d","d5539ca0.6fa72"]]},{"id":"939254df.abf078","type":"debug","z":"8c6e1704.118468","name":"","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","x":950,"y":240,"wires":[]},{"id":"eb574fb4.012d3","type":"comment","z":"8c6e1704.118468","name":"Request with some Filter Options","info":"","x":370,"y":80,"wires":[]},{"id":"cce1d930.4cf738","type":"comment","z":"8c6e1704.118468","name":"Stop Current Requests","info":"","x":340,"y":240,"wires":[]},{"id":"b096b816.da2d18","type":"comment","z":"8c6e1704.118468","name":"Request all Receipts","info":"","x":330,"y":160,"wires":[]}]
```