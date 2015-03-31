var request = require('request');

var DigitalOceanDynamicDNS = function(options, callback) {
	this.options = options;
	this.callback = callback;
	return this;
}

DigitalOceanDynamicDNS.cli = function() {
	if (process.argv.length > 4) {
		this.options = {
			apiToken: process.argv[2],
			recordID: process.argv[3],
			newIP: process.argv[4]
		};
		
		this.callback = function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
			}
		}
		
		this.updateRecord();
	}
	else {
		console.log("Usage: " + process.argv[1] + " [api_token] [record_id] [new_ip]");
	}
}

DigitalOceanDynamicDNS.updateRecord = function(options, callback) {
	if (typeof options == 'object') {
		this.options = options;
	}
	else if (typeof options == 'function') {
		this.callback = options;
	}
	
	if (typeof callback == 'object') {
		this.options = callback;
	}
	else if (typeof callback == 'function') {
		this.callback = callback;
	}
	
	if (!this.options && !this.callback) {
		return;
	}
	
	request({
		method: "PUT",
		url: 'https://api.digitalocean.com/v2/domains/virajchitnis.com/records/' + this.options.recordID,
		json: {
			data: this.options.newIP
		},
		auth: {
			bearer: this.options.apiToken
		}
	}, this.callback);
}

module.exports = DigitalOceanDynamicDNS;