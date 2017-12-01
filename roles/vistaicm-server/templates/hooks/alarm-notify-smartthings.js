const request = require("request");
const path = require('path');

const currentFileName = path.basename(__filename);

module.exports = function(ICM) {
//  ICM.events.on("alarmStatusChanged", function(alarmStatus) {
//  if (alarmStatus == 1 || alarmStatus == 2) { // security or fire alarm
    ICM.events.on('zoneStatusChanged', function(zoneNumber, isFaulted) {
      if (zoneNumber == 3 && isFaulted) {
        let smartThingsUrl = "https://graph-na02-useast1.api.smartthings.com:443/api/smartapps/installations/{{smartthings_installation}}/";
				let commandUrl = "device/c6293e32-76d6-4db3-ac8e-be9b07ef315a/command/on"; // Christmas Tree (TBD: 26bedceb-ca87-4109-8dcf-cc83942323ff)

				console.log(`(hook) ${currentFileName}: Sending command request to SmartThings API: ${commandUrl}`);

        request({
            url: (smartThingsUrl + commandUrl),
						method: "POST",
						headers: {
							Authorization: "Bearer {{smartthings_access_token}}"
						},
						json: true
					}, function(err, res, body) {
						if (err) {
							console.log(`(hook) ${currentFileName}: Error when notifying SmartThings of Alarm: ${err}`);
						} else {
							console.log(`(hook) ${currentFileName}: Response when notifiying SmartThings of Alarm: ${res.statusCode.toString()}`);
						}
				});
      }
    });
};

