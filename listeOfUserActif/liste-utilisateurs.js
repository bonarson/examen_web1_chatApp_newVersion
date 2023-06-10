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
// Initialisez Firestore
var db = firebase.firestore();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
        // Après avoir défini la persistance, appelez la méthode pour vérifier l'état de l'utilisateur
        checkAuthState();
    })
    .catch(function (error) {
        // Gestion des erreurs
        var errorCode = error.code;
        var errorMessage = error.message;
    });

function checkAuthState() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var activeUsersList = document.getElementById("activeUsersList");

            activeUsersList.addEventListener("click", function (event) {
                // Vérifiez si l'élément cliqué est un élément de liste
                if (event.target.tagName === "DIV") {
                    // Supprimez la classe .selected de tous les éléments de la liste
                    var userItems = activeUsersList.getElementsByTagName("div");
                    for (var i = 0; i < userItems.length; i++) {
                        userItems[i].classList.remove("selected");
                    }

                    // Ajoutez la classe .selected à l'élément cliqué
                    event.target.classList.add("selected");

                    var selectedUser = event.target.innerText;
                    displayUserMessages(selectedUser);
                    // Affichez le conteneur de message
                    document.getElementById("message-container").style.display = "block";
                    document.getElementById("smsprivate").style.display = "block";
                }
            });


            var userItem = document.createElement("div");

            var userItem = document.createElement("div");
            // userItem.style.marginLeft = "2vw";
            // userItem.style.border = "2px solid red";
            // userItem.style.display = "flex";
            // userItem.style.alignItems = "center";

            var userProfileImage = document.createElement("img");
            userProfileImage.style.borderRadius = "50%";
            //  userProfileImage.style.width = "5vw";
            // userProfileImage.style.marginRight = "2vw";
            userProfileImage.src = user.photoURL;
            userProfileImage.alt = "Photo de profil de " + user.displayName;
            userItem.appendChild(userProfileImage);

            var userName = document.createElement("span");
            userName.innerText = user.displayName;
            userItem.appendChild(userName);

            activeUsersList.appendChild(userItem);
            var br = document.createElement('br');
            activeUsersList.appendChild(br);

            // Ajoutez un gestionnaire d'événement au bouton d'envoi
            document.getElementById("send-button").addEventListener("click", function () {
                var senderUid = user.uid;
                var selectedUserElement = document.querySelector("#activeUsersList .selected");
                if (selectedUserElement) {
                    var receiverName = selectedUserElement.innerText;
                    sendMessage(senderUid, receiverName);
                } else {
                    console.error("Aucun utilisateur sélectionné.");
                }
            });
        } else {
            // Utilisateur non authentifié
        }
    });
}
function sendMessage(senderUid, receiverName) {
    var message = document.getElementById("message-input").value;

    if (message && senderUid && receiverName) {
        // Enregistrez le message dans Firestore
        db.collection("messages").add({
            sender: senderUid,
            receiver: receiverName,
            message: message,
            private: true // Ajoutez une propriété pour indiquer que c'est un message privé
        })
            .then(function (docRef) {
                // Afficher le message privé dans le conteneur de message
                var messageContainerPrivee = document.getElementById("messageContainerPrivee");
                var messageElement = document.createElement("div");
                messageElement.classList.add("private-message");
                messageElement.innerText = message + " (  à " + receiverName + ")";
                messageElement.style.color = "white";
                messageContainerPrivee.appendChild(messageElement);
                alert("Message privé envoyé !");
                document.getElementById('message-input').value='';
            })
            .catch(function (error) {
                console.error("Erreur lors de l'envoi du message : ", error);
            });
    }
}
function displayUserMessages(username) {
    // Effacez les messages précédents du conteneur de message
    var messageContainerPrivee = document.getElementById("messageContainerPrivee");
    messageContainerPrivee.innerHTML = "";

    // Récupérez les messages de Firestore pour l'utilisateur sélectionné
    db.collection("messages")
        .where("receiver", "==", username)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                var messageData = doc.data();

                // Afficher le message dans le conteneur de message
                var messageElement = document.createElement("div");
                messageElement.classList.add("message");
                messageElement.innerText = messageData.message + " (à " + messageData.receiver + ")";
                messageElement.style.color = "white";
                messageElement.style.fontSize = "1rem";
                //   messageElement.style.background='linear-gradient(to right, rgba(0, 0, 0, 0.454), rgba(0, 0, 0, 0.169))';
                // messageElement.style.boxShadow=' 0 5px 10px rgba(0, 0, 0, 0.875)';
                messageElement.style.paddingBlock = '2vh';
                messageElement.style.fontFamily = 'Franklin Gothic Medium', 'Arial Narrow';
                messageContainerPrivee.appendChild(messageElement);
                

            });
        })
        .catch(function (error) {
            console.error("Erreur lors de la récupération des messages : ", error);
        });
}













