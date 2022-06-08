'use strict';

const express = require('express');
const awsSTS = require('@aws-sdk/client-sts');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const accessKeyId = '';
const secretAccessKey = '';

// App
const app = express();

const getIdentity = async (accessKeyId,secretAccessKey,region) => {
  const logger = {
    info: function (log) {
      console.log('Info----->>>>>>>>>>>>>>>>>>>:', log);
    },
    debug: function (log) {
      console.log('debug:', log);
    },
    warn: function (log) {
      console.log('warn:', log);
    },
    error: function (log) {
      console.log('error:', log);
    },
  };
  const client = new awsSTS.STSClient({
    credentials: { accessKeyId, secretAccessKey },
    region: region,
    logger,
  });
  const response = await client.send(new awsSTS.GetCallerIdentityCommand());
  console.log(region, response)
  client.destroy();
}


app.get('/', async (req, res) => {
  await getIdentity(accessKeyId,secretAccessKey,'us-east-2')
  await getIdentity(accessKeyId,secretAccessKey,'us-east-1')
  await getIdentity(accessKeyId,secretAccessKey,'global')
  res.send('Hello World');
  process.exit();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
