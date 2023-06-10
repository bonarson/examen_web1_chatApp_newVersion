let menuToggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
menuToggle.onclick = function () {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
    // document.getElementById('conatiner_list').style.marginLeft='3vw';
}


//ajouter mouvement active sur les listes
let list = document.querySelectorAll(".list");
for (let i = 0; i < list.length; i++) {
    list[i].onclick = function () {
        let j = 0;
        while (j < list.length) {
            list[j++].className = "list";
        }
        list[i].className = 'list active';
    }
}
let clicMessage = document.getElementById('clicMessage');
clicMessage.addEventListener('click', function () {
    document.getElementById('conatiner_chat').style.display = "block";
    document.getElementById('conatiner_chat').style.display = "flex";
    document.getElementById('listOfFriendChatAnd').style.display = "none";
    document.getElementById('smsprivate').style.display='none';
});
let cliHome = document.getElementById('Home');
cliHome.addEventListener('click', function () {
    document.getElementById('conatiner_chat').style.display = "none";
    document.getElementById('userAuth').style.display = "block";
    document.getElementById('listOfFriendChatAnd').style.display = "block";
    document.getElementById('listOfFriendChatAnd').style.display = "flex";
    document.getElementById('listOfFriendChatAnd').style.flexDirection = "row";

    document.getElementById('userAuth').style.display = "flex";
    document.getElementById('userAuth').style.position = "relative";


});