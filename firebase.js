// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "config.APIKEY",
  authDomain: "config.authDomain",
  databaseURL: "config.databaseURL",
  projectId: "config.projectId",
  storageBucket: "config.storageBucket",
  messagingSenderId: "config.messagingSenderId",
  appId: "config.appId"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// console.log(firebase);

chrome.runtime.onMessage.addListener((msg, sender, response) => {

  if (msg.command == "fetch") {
    var domain = msg.data.domain;

    var enc_domain = btoa(domain);

    firebase.database().ref('/' + enc_domain + '/').once('value').then(function(snapshot) {
      // console.log(firebase.database().ref('/'+enc_domain));
      // console.log(snapshot.node_.value_);
      response({type: "result", status: "success", data: snapshot.val(), request: msg});
    });

  }
  return true;
})
