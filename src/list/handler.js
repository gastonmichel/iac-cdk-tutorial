const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event, context) => {
    let payload = {
        TableName: process.env.TABLE_NAME,
        Limit: 10
    }
    let body = await dynamoDB
        .scan(payload)
        .promise()
    return {
        "statusCode": 200,
        "body": JSON.stringify(body.Items)
    }
}