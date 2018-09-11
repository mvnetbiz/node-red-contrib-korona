module.exports = function (RED) {
	'use strict';

	function CredentialsNode(config) {
		RED.nodes.createNode(this, config);
		this.name = config.name;
	}


	RED.nodes.registerType('korona-api-credentials', CredentialsNode, {
		defaults: {
			name: {
				type: 'text',
				required: false
			}
		},
		category: 'config',
		credentials: {
			url: {
				value: 'https://koronacloud.com/web/api/v3',
				required: true
			},
			token: {
				type: 'text',
				required: true
			},
			username: {
				type: 'text',
				required: true
			},
			password: {
				type: 'password',
				required: true
			}
		}
	});
};