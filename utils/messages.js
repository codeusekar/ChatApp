const moment = require("moment");

function messageFormat(sentBy, message) {
    return {
        sentBy,
        message,
        time: moment().format('h:mm a')
    }
}
 
module.exports = messageFormat