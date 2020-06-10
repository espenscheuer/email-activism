const functions = require('firebase-functions');

exports.myFunctionName = functions.firestore
    .document('data/{templateId}/').onWrite((change, context) => {
      const original = change.val();
      console.log(original)
      return original;
    });
