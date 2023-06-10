var body = document.querySelector('body');
var mode = document.getElementById('mode');

mode.addEventListener('click', function () {
    body.removeAttribute('id');
    body.id = 'sombre';
    mode.innerText = 'clair';
    mode.removeAttribute('id');
    mode.id = 'clair';
    document.getElementById('navig').style.border = '2px solid white';
    document.getElementById('tongle').style.border='2px solid white';


    var mod = document.getElementById('clair');
    mod.addEventListener('click', function () {
        body.removeAttribute('id');
        body.id = 'claire';
        mod.innerText = 'sombre';
        mod.removeAttribute('id');
        mod.id = 'mode';
        document.getElementById('navig').style.border = 'none';

        mode.addEventListener('click', function () {
            body.removeAttribute('id');
            body.id = 'sombre';
            mode.innerText = 'clair';
            mode.removeAttribute('id');
            mode.id = 'clair';

            document.getElementById('navig').style.border = '2px solid white';

        })
    })
});


