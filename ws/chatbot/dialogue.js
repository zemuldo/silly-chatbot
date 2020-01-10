const dialogflow = require('dialogflow');
const projectId = process.env.GCP_PROJECT_ID;

const sessionClient = new dialogflow.SessionsClient(
  {keyFilename: 'key.json'}
);

async function process_message(msg) {
  const input = JSON.parse(msg)
  const sessionPath = sessionClient.sessionPath(projectId, input.sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: input.msg,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return result.fulfillmentText;
}

module.exports = process_message