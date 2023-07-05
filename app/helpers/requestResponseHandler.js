module.exports.initResponse = function (status = process.env.RESPONSE_STATUS_NO_CONTENT) {
    let response = {}
    response[process.env.RESPONSE_PARAMETER_STATUS] = status;
    response[process.env.RESPONSE_PARAMETER_MESSAGE] = {};
    return response;
}

module.exports.sendResponse = function (res, response) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = parseInt(response[process.env.RESPONSE_PARAMETER_STATUS], process.env.BASE);
    res.status(response[process.env.RESPONSE_PARAMETER_STATUS]).json(response);
}

module.exports.setInternalErrorMessage = function (response, err) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_INTERNAL_ERROR;
    response[process.env.RESPONSE_PARAMETER_MESSAGE][process.env.RESPONSE_PARAMETER_MESSAGE] = err;
}

module.exports.setBadRequestMessage = function (response, message) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_INVALID_PARAMETER;
    response[process.env.RESPONSE_PARAMETER_MESSAGE][process.env.RESPONSE_PARAMETER_MESSAGE] = message;
}

module.exports.setUnAuthorizedMissingTokenRequestMessage = function (response) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_UNAUTHORIZED_MISSING_HEADER;
    response[process.env.RESPONSE_PARAMETER_MESSAGE][process.env.RESPONSE_PARAMETER_MESSAGE] = process.env.RESPONSE_STATUS_UNAUTHORIZED_MISSING_HEADER_MESSAGE;
}

module.exports.setUnAuthorizedRequestMessage = function (response) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_UNAUTHORIZED;
    response[process.env.RESPONSE_PARAMETER_MESSAGE][process.env.RESPONSE_PARAMETER_MESSAGE] = process.env.RESPONSE_STATUS_UNAUTHORIZED_MESSAGE;
}

module.exports.setNotFoundMessage = function (response, message) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_NOT_FOUND;
    response[process.env.RESPONSE_PARAMETER_MESSAGE][process.env.RESPONSE_PARAMETER_MESSAGE] = message;
}

module.exports.setSuccessfullMessage = function (response, message) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_OK;
    response[process.env.RESPONSE_PARAMETER_MESSAGE][process.env.RESPONSE_PARAMETER_MESSAGE] = message;
}

module.exports.setSuccessfullOperationMessage = function (response, data) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_OK;
    response[process.env.RESPONSE_PARAMETER_MESSAGE] = data;
}

module.exports.setSuccessfullCreateMessage = function (response, data) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_CREATED;
    response[process.env.RESPONSE_PARAMETER_MESSAGE] = data;
}

module.exports.setSuccessfullLoginMessage = function (response, token) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_CREATED;
    response[process.env.RESPONSE_PARAMETER_MESSAGE][process.env.RESPONSE_PARAMETER_TOKEN] = token;
}

module.exports.setSuccessfullDeleteMessage = function (response, data) {
    response[process.env.RESPONSE_PARAMETER_STATUS] = process.env.RESPONSE_STATUS_DELETED;
    response[process.env.RESPONSE_PARAMETER_MESSAGE] = data;
}

module.exports.checkStatusUpdated = function (response){
    return process.env.RESPONSE_STATUS_NO_CONTENT !== response[process.env.RESPONSE_PARAMETER_STATUS];
}

module.exports.setErrorMessage = function (response, error) {
    console.log(error)
    if(error.status){
        response= error
    }else{
        this.setInternalErrorMessage(response,error)
    }
}