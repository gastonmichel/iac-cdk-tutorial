import os
import json

from aws_cdk import (
    core as cdk,
    aws_lambda as lambda_,
    aws_apigateway as apigateway,
    aws_dynamodb as dynamodb,

)

app = cdk.App()

env = cdk.Environment(
    account='841690643466',
    region='us-west-1'
)


class CRUDStack(cdk.Stack):
    def __init__(self, scope: cdk.Construct, id: str, **kwargs):
        super().__init__(scope=scope, id=id, **kwargs)

        self.table = dynamodb.Table(
            self, "BooksTable",
            partition_key=dynamodb.Attribute(
                name="bookId", type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
        )

        common_function_params = {
            'handler': 'handler.handler',
            'runtime': lambda_.Runtime.NODEJS_14_X,
            'environment': {
                'TABLE_NAME': self.table.table_name,
            },
        }

        self.read_function = lambda_.Function(
            self, "ReadFunction",
            code=lambda_.Code.from_asset('src/read'),
            **common_function_params,
        )
        self.table.grant_read_data(self.read_function)

        self.create_function = lambda_.Function(
            self, 'CreateFunction',
            code=lambda_.Code.from_asset('src/create'),
            **common_function_params,
        )
        self.table.grant_write_data(self.create_function)

        self.api = apigateway.RestApi(
            self, 'BooksApi'
        )

        books = self.api.root

        books.add_method(
            'POST', apigateway.LambdaIntegration(self.create_function))

        book = self.api.root.add_resource('{bookId}')
        book.add_method(
            'GET', apigateway.LambdaIntegration(self.read_function))
            


stack = CRUDStack(app, 'CRUD', env=env)

app.synth()
