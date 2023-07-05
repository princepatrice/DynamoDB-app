const AWS = require('aws-sdk');

// Configure the AWS SDK with your credentials and region
AWS.config.update({
    accessKeyId: process.env.YOUR_ACCESS_KEY,
    secretAccessKey: process.env.YOUR_SECRET_KEY,
    region: process.env.PREFERED_REGION, // Replace with your desired region
});

const dynamodb = new AWS.DynamoDB();
const requestResponseHandler = require("../helpers/requestResponseHandler");
const usefull = require("../helpers/usefull");
const tableName = 'Music';
const authors = "Koya Patrice Dzogbema"


/**
 * Partition key — Artist
 * Sort key — SongTitle
 */

const checkKeys = function (req, res, next) {
    const data = req.body.keys?req.body.keys:req.body
    if (!data?.Artist || !data?.SongTitle) {
        const response = requestResponseHandler.initResponse();
        requestResponseHandler.setBadRequestMessage(response, "Artist and SongTitle attribute are required");
        requestResponseHandler.sendResponse(res, response)
    } else {
        next();
    }
}

const getAll = function (req, res) {
    const { response } = usefull.getUrlParams(req);
    requestResponseHandler.setSuccessfullOperationMessage(response, []);
    requestResponseHandler.sendResponse(res, response);
}

const getOne = function (req, res) {
    const response = requestResponseHandler.initResponse();
    const data = req.body;
    const params = {
        TableName: tableName,
        Key: {
            //  Artist: { S: data.Artist }, // Partition key
            // SongTitle: { S: data.SongTitle }, // Sort key
            ...data
        },
    };

    dynamodb.getItem(params).promise().then((element) => {
        const message = `${authors}  retrieve item: `;
        console.log(message)
        requestResponseHandler.setSuccessfullMessage(response, element);
    }).catch((error) => {
        console.log(error)
        requestResponseHandler.setBadRequestMessage(response, error);
    }).finally(() => {
        requestResponseHandler.sendResponse(res, response);
    });

}

const addOne = async function (req, res) {
    const response = requestResponseHandler.initResponse();
    const data = req.body;
    const params = {
        TableName: tableName,
        Item: {
            ...data,
            timestamp: { N: `${Date.now()}` }
        },
    };

    dynamodb.putItem(params).promise().then(() => {
        const message = `${authors}  added item `;
        console.log(message)
        requestResponseHandler.setSuccessfullCreateMessage(response, message);
    }).catch((error) => {
        console.log(error)
        requestResponseHandler.setBadRequestMessage(response, error);
    }).finally(() => {
        requestResponseHandler.sendResponse(res, response);
    });
}

const updateOne = function (req, res) {
    const response = requestResponseHandler.initResponse();
    const data = req.body;
    const params = {
        TableName: tableName,
        Key: {
            //  Artist: { S: data.Artist }, // Partition key
            // SongTitle: { S: data.SongTitle }, // Sort key
            ...data?.keys
        },
        UpdateExpression: 'SET #alb = :AlbumTitleValue, #aw=:AwardsValue', // Update the 'name' attribute
        ExpressionAttributeNames: {
            '#alb': 'AlbumTitle',
            '#aw':'Awards'
        },
        ExpressionAttributeValues: {
            ':AlbumTitleValue': data?.values?.AlbumTitle,
            ':AwardsValue': data?.values?.Awards, 
        },
        ReturnValues: 'ALL_NEW', // To get the updated item in the response

    };

    dynamodb.updateItem(params).promise().then((element) => {
        const message = `${authors}  update item: `;
        console.log(message)
        requestResponseHandler.setSuccessfullMessage(response, element);
    }).catch((error) => {
        console.log(error)
        requestResponseHandler.setBadRequestMessage(response, error);
    }).finally(() => {
        requestResponseHandler.sendResponse(res, response);
    });
}

const deleteOne = function (req, res) {
    const response = requestResponseHandler.initResponse();
    const data = req.body;
    const params = {
        TableName: tableName,
        Key: {
            //  Artist: { S: data.Artist }, // Partition key
            // SongTitle: { S: data.SongTitle }, // Sort key
            ...data
        },
    };

    dynamodb.deleteItem(params).promise().then((element) => {
        const message = `${authors}  delete item: `;
        console.log(message)
        requestResponseHandler.setSuccessfullMessage(response, element);
    }).catch((error) => {
        console.log(error)
        requestResponseHandler.setBadRequestMessage(response, error);
    }).finally(() => {
        requestResponseHandler.sendResponse(res, response);
    });
}

module.exports = {
    getAll,
    getOne,
    addOne,
    updateOne,
    deleteOne,
    checkKeys
}