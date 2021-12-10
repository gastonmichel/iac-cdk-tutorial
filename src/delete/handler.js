const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient()

module.exports.handler = async (event, context) => {
    let body = await dynamoDB
        .delete({
            TableName: process.env.TABLE_NAME,
            Key: {
                bookId: event.pathParameters.bookId,
            },
        })
        .promise()
    return {
        "statusCode": 204
    }
}