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

    // Référence à la base de données Firestore
    var db = firebase.firestore();

    // Référence au conteneur de chat
    var chatContainer = document.getElementById('chatContainer');

    // Vérifie si l'utilisateur est connecté
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Utilisateur connecté
            var displayName = user.displayName;
            var email = user.email;
            var photoURL = user.photoURL;

            // Crée les éléments pour afficher les informations du profil
            var displayNameElement = document.createElement('div');
            displayNameElement.textContent = 'Nom: ' + displayName;

            var emailElement = document.createElement('div');
            emailElement.textContent = 'Email: ' + email;

            var photoElement = document.createElement('img');
            photoElement.src = photoURL;

            // Ajoute les éléments au conteneur du profil
            var profileContainer = document.getElementById('profileContainer');
            profileContainer.appendChild(displayNameElement);
            profileContainer.appendChild(photoElement);
            // Ajoute les éléments au userAuth 
            var userAuthList = document.getElementById('userAuth');
            userAuthList.appendChild(displayNameElement);
            userAuthList.appendChild(photoElement);
            // Ecoute les messages ajoutés à la collection "messages"
            db.collection('messages').orderBy('timestamp').onSnapshot(function (snapshot) {
                chatContainer.innerHTML = ''; // Efface les messages précédents

                snapshot.forEach(function (doc) {
                    var messageData = doc.data();
                    var messageElement = document.createElement('div');
                    var heure = document.createElement('div');
                    messageElement.textContent = messageData.message;
                    
                    messageElement.classList.add('message'); // Ajoute la classe CSS "message"
                    messageElement.style.color = 'white';
                    messageElement.style.fontSize = '1rem';
                    messageElement.style.position = "relative";
                    messageElement.style.paddingLeft = "6.5vw";
                    // messageElement.style.paddingTop = "1.1vw";

                    messageElement.style.wordBreak = "break-word"; // Ajoute la propriété CSS pour sauter à la ligne
                    messageElement.style.fontFamily = "Times New Roman', Times, serif"
                    messageElement.style.display = "flex";
                    messageElement.style.alignItems = 'center';

                    // Crée un élément pour afficher le nom de l'utilisateur
                    var userElement = document.createElement('div');
                    userElement.textContent = 'Utilisateur : ' + messageData.user;
                    userElement.classList.add('user'); // Ajoute une classe CSS pour le style du nom de l'utilisateur

                    // Crée un élément pour afficher la date du message
                    var timestampElement = document.createElement('div');
                    heure.classList.add('timestamps');
                    heure.textContent = messageData.timestamp.toDate().toLocaleString();
                    heure.classList.add('timestamp'); // Ajoute une classe CSS pour le style de la date

                    // Crée un élément d'image pour afficher la photo de profil à côté du message
                    var photoElement = document.createElement('img');
                    photoElement.src = messageData.photoURL;
                    photoElement.style.width = '4vw'; // Ajoute un style pour ajuster la taille de l'image

                    // Ajoute les éléments au message
                    // messageElement.appendChild(userElement);
                    heure.appendChild(timestampElement);
                    messageElement.appendChild(photoElement);

                    // Ajoute le message au conteneur de chat
                    chatContainer.appendChild(messageElement);
                    chatContainer.appendChild(heure);
                });
            });

            var messageForm = document.getElementById('messageForm');
            var messageInput = document.getElementById('messageInput');
            messageForm.addEventListener('submit', function (event) {
                event.preventDefault(); // Empêche le rechargement de la page

                var message = messageInput.value.trim();

                // Vérifie que le message n'est pas vide
                if (message !== '') {
                    // Enregistre le message dans la base de données Firestore
                    db.collection('messages').add({
                        message: message,
                        user: user.uid,
                        photoURL: user.photoURL,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(function () {
                        messageInput.value = ''; // Efface le champ de texte après l'envoi
                    }).catch(function (error) {
                        console.error('Erreur lors de l\'envoi du message:', error);
                    });
                }
            });


        } else {
            // Utilisateur non connecté
            var profileContainer = document.getElementById('profileContainer');
            profileContainer.textContent = 'Veuillez vous connecter pour afficher votre profil.';
            profileContainer.style.color = "red";
            profileContainer.style.fontSize = "1.2rem";
        }
    });

});
