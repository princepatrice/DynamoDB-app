
const requestResponseHandler = require("./requestResponseHandler");

const getUrlParams = function (req) {

    const response = requestResponseHandler.initResponse();
    let offset = parseInt(process.env.DEFAULT_OFFSET, process.env.BASE);
    let count = parseInt(process.env.DEFAULT_COUNT, process.env.BASE);
    let maxRecords = parseInt(process.env.MAX_RECORDS, process.env.BASE);
    let search = ""

    if (req.query && req.query.search) {
        search = req.query.search
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, process.env.BASE);
        if (isNaN(offset)) {
            requestResponseHandler.setBadRequestMessage(response, process.env.RESPONSE_STATUS_INVALID_PARAMETER_OFFSET);
        }
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, process.env.BASE);
        if (isNaN(count)) {
            requestResponseHandler.setBadRequestMessage(response, process.env.RESPONSE_STATUS_INVALID_PARAMETER_COUNT);
        } else if (count > maxRecords) {
            requestResponseHandler.setBadRequestMessage(response, process.env.RESPONSE_STATUS_INVALID_PARAMETER_COUNT_EXCEED_LABEL);
        }
    }

    return { offset, count, search, response }

}

module.exports = {
    getUrlParams
}