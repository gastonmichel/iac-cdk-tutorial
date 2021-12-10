const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event, context) => {
    var body = JSON.parse(event.body)
    let response = await dynamoDB
        .put({
            TableName: process.env.TABLE_NAME,
            Item: {
                bookId: event.pathParameters.bookId,
                title: body.title,
                author: body.author,
                updatedAt: (new Date()).toISOString()
            },
        })
        .promise()
    return {
        "statusCode": 200,
        "body": event.pathParameters.bookId
    }
}