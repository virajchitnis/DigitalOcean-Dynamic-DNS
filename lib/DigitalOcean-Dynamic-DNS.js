var request = require('request');

function main() {
	if (process.argv.length > 4) {
		var apiToken = process.argv[2];
		var recordID = process.argv[3];
		var newIP = process.argv[4];
		
		request({
			method: "PUT",
			url: 'https://api.digitalocean.com/v2/domains/virajchitnis.com/records/' + recordID,
			json: {
				data: newIP
			},
			auth: {
				bearer: apiToken
			}
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
			}
		});
	}
	else {
		console.log("Usage: " + process.argv[1] + " [api_token] [record_id] [new_ip]");
	}
}

exports.main = main;