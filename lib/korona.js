var koronaHelper = require('./korona.js');
var KoronacloudApiV3 = require('cloud-api-v3-js-client');
/**
 * Helper and Utility Functions
 * For: Paging of API-Reqests, Node-Status Updates, ...
 */

// Proccess Node Action
exports.proccessNodeAct = function (node, msg, korona) {
	// API Setup
	var defaultClient = KoronacloudApiV3.ApiClient.instance;
	var basicAuth = defaultClient.authentications['basicAuth'];
	basicAuth.username = korona.username;
	basicAuth.password = korona.password;
	defaultClient.basePath = korona.url;
	var accountId = korona.token;
	var context = node.context();
	var opts = msg.opts || {};
	// handle special node types
	if (node.type === 'PointsOfSale') {
		var apiInstance = new KoronacloudApiV3.PointsOfSaleApi();
	} else if (node.type === 'SalesTax') {
		var apiInstance = new KoronacloudApiV3.SalesTaxesApi();
	} else {
		var apiInstance = new KoronacloudApiV3[node.type + 'sApi']();
	}

	// GET
	if (node.action == 'GET' && !context.reset) {
		//console.log(node.type + ' GET request');
		var opts = msg.opts || {};
		// Set API Callback Function
		var callback = function (error, data, response) {
			context.busy_connections--;
			koronaHelper.proccessNodeMsg(node, error, response);
			// keep working with all connections if queue is not empty
			if (data) {
				if (context.page_queue.length > 0) {
					var con = node.connections - context.busy_connections;
					if (context.page_queue.length < con) {
						con = context.page_queue.length;
					}

					// make more requests
					for (var i = 0; i < con; i++) {
						context.busy_connections++;
						let page = context.page_queue.shift();
						opts.page = page;
						opts.size = opts.size || node.pagesize;
						apiInstance[koronaHelper.apiMethodNameForNode(node)](
							accountId,
							opts,
							callback
						);
					}
				} else if (data.currentPage === 1 && data.pagesTotal > 1) {
					// fill the page queue
					let pages = data.pagesTotal;
					for (var j = 2; j <= pages; j++) {
						//console.log('fill page queue: ' + j);
						context.page_queue = context.page_queue.concat(j);
					}
					// make next requests
					// check connection limit
					if (context.busy_connections < node.connections) {
						var con = node.connections - context.busy_connections;
						if (context.page_queue.length < con) {
							con = context.page_queue.length;
						}

						// make more requests
						for (var i = 0; i < con; i++) {
							context.busy_connections++;
							let page = context.page_queue.shift();
							opts.page = page;
							opts.size = opts.size || node.pagesize;
							apiInstance[koronaHelper.apiMethodNameForNode(node)](
								accountId,
								opts,
								callback
							);
						}
					} // END of check connection limit
				}

				// update node status
				node.status({
					fill: 'green',
					shape: 'dot',
					text: node.action +
						fpercentStr(
							data.pagesTotal - context.page_queue.length,
							'0',
							data.pagesTotal
						)
				});
			} // END of Data
		}; // END of callback

		// add objects to the queue
		if (msg.payload && Array.isArray(msg.payload) && msg.payload.length > 0) {
			//console.log('add ' + msg.payload.length + ' objects to the queue...');
			context.object_queue = context.object_queue.concat(msg.payload);
		}

		//console.log(node.type + ' check connection limit = ' + (context.busy_connections < node.connections));
		// check connection limit
		if (context.busy_connections < node.connections) {
			var con = node.connections - context.busy_connections;
			if (context.page_queue.length < con) {
				con = context.page_queue.length;
			}
			// make the first requests if page queue and object queue are empty
			if (context.page_queue.length <= 0 && context.object_queue.length <= 0) {
				// check if a specific object is requested
				if (msg.payload && msg.payload.name) {}
				// first request
				context.busy_connections++;
				opts.page = 1;
				opts.size = opts.size || node.pagesize;
				//console.log('first request');
				apiInstance[koronaHelper.apiMethodNameForNode(node)](
					accountId,
					opts,
					callback
				);
			}

			// make specific request based on payload
			// split objects by pages and connections
			let connections = node.connections;
			let parts = context.object_queue.length / node.pagesize;
			if (connections <= parts) {
				for (var j = 0; j < connections; j++) {
					var body = getQueuePart(node, node.connections);
					if (body.length > 0) {
						context.processed += body.length;
						let num = body.length;
						for (var i = 0; i < num; i++) {
							context.busy_connections++;
							let num = koronaHelper.getObjIdOrNumber(body[i]);
							if (num) apiInstance['get' + node.type](accountId, num, callback);
						}
					}
				}
			} else {
				var num = ((context.object_queue.length / node.pagesize) | 0) + 1;
				for (var j = 0; j < num; j++) {
					var body = getQueuePart(node, node.connections);
					if (body.length > 0) {
						context.processed += body.length;
						let num = body.length;
						for (var i = 0; i < num; i++) {
							context.busy_connections++;
							let num = koronaHelper.getObjIdOrNumber(body[i]);
							if (num) apiInstance['get' + node.type](accountId, num, callback);
						}
					}
				}
			}
		} // END of check connection limit
	}

	// POST - Add
	else if (node.action == 'POST' && !context.reset) {
		//console.log("on POST, queue = " + context.object_queue.length + " pagesize = " + node.pagesize + " busy connections = " + context.busy_connections);

		// Set API Callback Function
		var callback = function (error, data, response) {
			context.busy_connections--;
			koronaHelper.proccessNodeMsg(node, error, response);
			// keep working if queue is not empty
			if (context.object_queue.length > 0) {
				var body2 = getQueuePart(node);
				context.processed += body2.length;
				context.busy_connections++;
				//apiInstance.addProducts(accountId, body2, callback);
				apiInstance[koronaHelper.apiMethodNameForNode(node)](
					accountId,
					body2,
					callback
				);
			}
			koronaHelper.updateStatus(node);
		};

		// add objects to the queue
		context.object_queue = context.object_queue.concat(msg.payload);

		// check connection limit
		if (context.busy_connections < node.connections) {
			// split objects by pages and connections
			let con = node.connections;
			let parts = context.object_queue.length / node.pagesize;
			if (con <= parts) {
				for (var j = 0; j < con; j++) {
					var body = getQueuePart(node);
					if (body.length > 0) {
						context.processed += body.length;
						context.busy_connections++;
						//apiInstance.addProducts(accountId, body, callback);
						apiInstance[koronaHelper.apiMethodNameForNode(node)](
							accountId,
							body,
							callback
						);
					}
				}
			} else {
				var num = ((context.object_queue.length / node.pagesize) | 0) + 1;
				for (var j = 0; j < num; j++) {
					var body = getQueuePart(node);
					if (body.length > 0) {
						context.processed += body.length;
						context.busy_connections++;
						//console.log("node.type=" + node.type);
						//console.log("apiMethodNameForNode=" + koronaHelper.apiMethodNameForNode(node));
						apiInstance[koronaHelper.apiMethodNameForNode(node)](
							accountId,
							body,
							callback
						);
					}
				}
			}
		} // END of check connection limit
		koronaHelper.updateStatus(node);
	}

	// PATCH - Update
	else if (node.action == 'PATCH' && !context.reset) {
		//console.log("on PATCH, queue = " + context.object_queue.length + " pagesize = " + node.pagesize + " busy connections = " + context.busy_connections);

		// Set API Callback Function
		var callback = function (error, data, response) {
			context.busy_connections--;
			koronaHelper.proccessNodeMsg(node, error, response);
			// keep working if queue is not empty
			if (context.object_queue.length > 0) {
				var body2 = getQueuePart(node);
				context.processed += body2.length;
				context.busy_connections++;
				//apiInstance.updateProducts(accountId, body2, callback);
				apiInstance[koronaHelper.apiMethodNameForNode(node)](
					accountId,
					body2,
					callback
				);
			}
			koronaHelper.updateStatus(node);
		};

		// add objects to the queue
		context.object_queue = context.object_queue.concat(msg.payload);

		// check connection limit
		if (context.busy_connections < node.connections) {
			// split objects by pages and connections
			let con = node.connections;
			let parts = context.object_queue.length / node.pagesize;
			if (con <= parts) {
				for (var j = 0; j < con; j++) {
					var body = getQueuePart(node);
					if (body.length > 0) {
						context.product_processed += body.length;
						context.busy_connections++;
						//apiInstance.updateProducts(accountId, body, callback);
						apiInstance[koronaHelper.apiMethodNameForNode(node)](
							accountId,
							body,
							callback
						);
					}
				}
			} else {
				var num = ((context.object_queue.length / node.pagesize) | 0) + 1;
				for (var j = 0; j < num; j++) {
					var body = getQueuePart(node);
					if (body.length > 0) {
						context.processed += body.length;
						context.busy_connections++;
						//apiInstance.updateProducts(accountId, body, callback);
						apiInstance[koronaHelper.apiMethodNameForNode(node)](
							accountId,
							body,
							callback
						);
					}
				}
			}
		} // END of check connection limit
		koronaHelper.updateStatus(node);
	}

	// DELETE
	else if (node.action == 'DELETE' && !context.reset) {
		// Set API Callback Function
		var callback = function (error, data, response) {
			context.busy_connections--;
			koronaHelper.proccessNodeMsg(node, error, response);
			// keep working if queue is not empty
			if (context.object_queue.length > 0) {
				var body2 = getQueuePart(node, node.connections);
				context.processed += body2.length;
				let num = body2.length;
				for (var i = 0; i < num; i++) {
					context.busy_connections++;
					let num = koronaHelper.getObjIdOrNumber(body2[i]);
					//apiInstance.deleteProduct(accountId, num, callback);
					apiInstance[koronaHelper.apiMethodNameForNode(node)](
						accountId,
						num,
						callback
					);
				}
			}
			koronaHelper.updateStatus(node);
		};

		// check type and add objects to the queue
		if (typeof msg.payload === 'string' || msg.payload instanceof String) {
			context.object_queue = context.object_queue.concat({
				number: msg.payload
			});
		} else {
			context.object_queue = context.object_queue.concat(msg.payload);
		}

		// check connection limit
		if (context.busy_connections < node.connections) {
			// split objects by pages and connections
			let con = node.connections;
			let parts = context.object_queue.length / node.pagesize;
			if (con <= parts) {
				for (var j = 0; j < con; j++) {
					var body = getQueuePart(node, node.connections);
					if (body.length > 0) {
						context.processed += body.length;
						let num = body.length;
						for (var i = 0; i < num; i++) {
							context.busy_connections++;
							let num = koronaHelper.getObjIdOrNumber(body[i]);
							//apiInstance.deleteProduct(accountId, num, callback);
							apiInstance[koronaHelper.apiMethodNameForNode(node)](
								accountId,
								num,
								callback
							);
						}
					}
				}
			} else {
				var num = ((context.object_queue.length / node.pagesize) | 0) + 1;
				for (var j = 0; j < num; j++) {
					var body = getQueuePart(node, node.connections);
					if (body.length > 0) {
						context.processed += body.length;
						let num = body.length;
						for (var i = 0; i < num; i++) {
							context.busy_connections++;
							let num = koronaHelper.getObjIdOrNumber(body[i]);
							//apiInstance.deleteProduct(accountId, num, callback);
							apiInstance[koronaHelper.apiMethodNameForNode(node)](
								accountId,
								num,
								callback
							);
						}
					}
				}
			}
		} // END of check connection limit
		koronaHelper.updateStatus(node);
	} else {
		koronaHelper.proccessNodeMsg(node, 'Unknown Action: ' + node.action, null);
	}
};

// Proccess Node Message Output
exports.proccessNodeMsg = function (node, error, response) {
	// Make new Message Object
	var newMsg = {};
	if (response) {
		newMsg.statusCode = response.statusCode;
		newMsg.requestURL = response.request.url;
		newMsg.response = response.body;

		// check AccountIDs
		let a1 = getAccountIdFromURL(response.request.url);
		var a2 = null;
		if (response.body.links) {
			a2 = getAccountIdFromURL(response.body.links.self);
		}

		if (a1 !== null && a2 !== null && a1 !== a2) {
			node.error(
				'Oh No: Account-IDs not equal: requestAcc= ' +
				a1 +
				' responseAcc= ' +
				a2
			);
		}
		if (Array.isArray(response.body)) {
			for (var i = 0; i < response.body.length; i++) {
				let a3 = getAccountIdFromURL(response.body[i].href);
				if (a1 !== null && a3 !== null && a1 !== a3) {
					node.error(
						'Oh No: Account-IDs not equal: requestAcc= ' +
						a1 +
						' responseAcc= ' +
						a2 +
						' number=' +
						response.body[i].number
					);
				}
			}
		}
	}

	// ON ERROR
	if (error) {
		newMsg.payload = '' + error;
		if (node.rtype == 'JSON') {
			node.send([null, JSON.stringify(newMsg)]);
		} else {
			node.send([null, newMsg]);
		}
	} else {
		// ON SUCCESS
		newMsg.payload = response.body.results || [{
			action: response.request.method,
			href: response.request.url,
			status: 'OK'
		}];
		if (node.rtype == 'JSON') {
			newMsg.payload = JSON.stringify(response.body.results);
			node.send([newMsg, null]);
		} else {
			node.send([newMsg, null]);
		}
	}
};

// UPDATE the Node Status
exports.updateStatus = function (node) {
	var context = node.context();
	if (context.object_queue.length <= 0) {
		node.status({
			fill: 'green',
			shape: 'dot',
			text: 'done with ' + context.processed + ' records'
		});
	} else {
		node.status({
			fill: 'blue',
			shape: 'ring',
			text: 'remaining ' + context.object_queue.length + ' records'
		});
	}
};

// Get the APIv3 Cloud Object ID or Number if they exsist or return null
exports.getObjIdOrNumber = function (obj) {
	if (obj) {
		if (obj.id) {
			return obj.id;
		} else if (obj.number) {
			return obj.number;
		}
	}
	return null;
};

// Some Helper Functions
function getAccountIdFromURL(url) {
	let preIndex = url.indexOf('accounts/');
	return url.substring(preIndex + 9, preIndex + 45);
}
// Get Api Method for Node
exports.apiMethodNameForNode = function (node) {
	if (node.action === 'GET') {
		if (node.type === 'PointsOfSale') return 'get' + node.type;
		if (node.type === 'SalesTax') return 'get' + node.type + 'es';
		return 'get' + node.type + 's';
	} else if (node.action === 'POST') {
		if (node.type === 'PointsOfSale') return 'add' + node.type;
		if (node.type === 'SalesTax') return 'add' + node.type + 'es';
		return 'add' + node.type + 's';
	} else if (node.action === 'PATCH') {
		if (node.type === 'PointsOfSale') return 'update' + node.type;
		if (node.type === 'SalesTax') return 'update' + node.type + 'es';
		return 'update' + node.type + 's';
	} else if (node.action === 'DELETE') {
		return 'delete' + node.type;
	}
};

function fpercentStr(number, min, max) {
	return (' ' + rangeToPercent(parseInt(number || '0'), parseInt(min || '0'), parseInt(max || '1')) + '%');
}

function rangeToPercent(number, min, max) {
	var p = parseInt((((number - min) / (max - min)) || 0) * 100);
	if (Number.isNaN(p)) return 100;
	return p;
}

// get a slice / part of the nodes queued objects for proccessing
function getQueuePart(node, size) {
	var context = node.context();
	var part = [];
	if (size) {
		if (context.object_queue.length >= size) {
			for (var i = 0; i < size; i++) {
				part.push(context.object_queue.shift());
			}
		} else {
			var ql = context.object_queue.length;
			for (var i = 0; i < ql; i++) {
				part.push(context.object_queue.shift());
			}
		}
	} else {
		if (context.object_queue.length >= node.pagesize) {
			for (var i = 0; i < node.pagesize; i++) {
				part.push(context.object_queue.shift());
			}
		} else {
			var size = context.object_queue.length;
			for (var i = 0; i < size; i++) {
				part.push(context.object_queue.shift());
			}
		}
	}
	return part;
}