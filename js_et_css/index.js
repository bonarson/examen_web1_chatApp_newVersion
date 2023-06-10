document.addEventListener('DOMContentLoaded', function () {
  // Remplacez les valeurs ci-dessous par vos propres clés de configuration Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyB4qi7QKznvM7pQnCjUNqNDKV9W4IAkgOM",
    authDomain: "loginchat-6cd5c.firebaseapp.com",
    projectId: "loginchat-6cd5c",
    storageBucket: "loginchat-6cd5c.appspot.com",
    messagingSenderId: "1093350338697",
    appId: "1:1093350338697:web:3a642fa6f088988583d658"
  };

  // Initialisez Firebase
  firebase.initializeApp(firebaseConfig);

  // Créez une instance de l'objet GoogleAuthProvider
  var provider = new firebase.auth.GoogleAuthProvider();

  // Configurez les options supplémentaires pour la connexion Google
  provider.setCustomParameters({
    prompt: 'select_account' // Affiche toujours la boîte de dialogue de sélection du compte Google
  });

  // Obtenez une référence à l'élément bouton de connexion Google Sign-In
  var signInButton = document.getElementById('googleSignInButton');

 
  // Attachez un gestionnaire d'événements au clic du bouton de connexion Google
  signInButton.addEventListener('click', function () {
    // Déclenche la fenêtre contextuelle de connexion Google
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // L'utilisateur est connecté avec succès
      var user = result.user;
      console.log(user);

      //stocker l'etat de connexion dans web storage
      localStorage.setItem('isLoggedIn','true');
      //rediger vers la pade de message ou message.html
      window.location.href='new/message.html'
    }).catch(function (error) {
      // Une erreur s'est produite lors de la connexion
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  });
  
});

