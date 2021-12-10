const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event, context) => {
    console.log(event)
    let body = await dynamoDB
        .get({
            TableName: process.env.TABLE_NAME,
            Key: {
                bookId: event.pathParameters.bookId
            }
        })
        .promise()

    if ('Item' in body) {
        return {
            "statusCode": 200,
            "body": JSON.stringify(body.Item)
        }
    }
    else {
        return {
            "statusCode": 404
        }
    }
}