const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const crypto = require('crypto')

module.exports.handler = async (event, context) => {
    const bookId = crypto.randomBytes(16).toString("hex")
    var body = JSON.parse(event.body)
    let response = await dynamoDB
        .put({
            TableName: process.env.TABLE_NAME,
            Item: {
                bookId: bookId,
                title: body.title,
                author: body.author,
                updatedAt: (new Date()).toISOString()
            },
        })
        .promise()
    return {
        "statusCode": 200,
        "body": bookId
    }
}