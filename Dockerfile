ARG ALPINE_VERSION=3.13
ARG PYTHON_VERSION=3.10
FROM python:${PYTHON_VERSION}-alpine${ALPINE_VERSION}
ARG AWS_CDK_VERSION=1.132.0

RUN apk -v --no-cache --update add \
        nodejs \
        npm \
        ca-certificates \
        groff \
        less \
        bash \
        make \
        curl \
        wget \
        zip \
        git \
        && \
    update-ca-certificates
    
RUN npm install -g aws-cdk@${AWS_CDK_VERSION}

VOLUME [ "/root/.aws" ]
VOLUME [ "/opt/app" ]

WORKDIR /opt/app

RUN python -m pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

ENTRYPOINT [ "cdk" ]