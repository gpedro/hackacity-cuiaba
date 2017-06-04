const functions = require('firebase-functions');
const _ = require('lodash')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const Datastore = require('@google-cloud/datastore');
const datastore = Datastore({
    projectId: 'vrum-hackacity'
});

const kind = 'ocorrenciaPorVitima';

function generateKey(row){
  return row['MES']+','+row['ANO']+','+row['lat']+','+row['lng'];
}

exports.getList = functions.https.onRequest((request, response) => {
  const query = datastore
            .createQuery(kind)
            .order('DATA_TEMPO', { descending: true });
        return datastore.runQuery(query)
            .then(results => results[0])
            .then(results => _.countBy(results, generateKey))
            .then(results => {
                response.json(results);
            });
});