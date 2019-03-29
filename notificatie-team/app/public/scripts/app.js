(function () {
    if (window.location.pathname.includes('team')) {
        setTimeout(function() {
            if(checkNotification()) {
                Notification.requestPermission(function (permission) {
                    if (permission === "default") {
                        console.log(permission);
                    } else if (permission === "granted") {
                        var img = checkQuerySelector('.team-a').src;
                        var team = checkQuerySelector('.current-team').textContent;
                        var text = `${team} heeft gescoord!`;
                        var notification = new Notification('Voetbal update', {
                            body: text,
                            icon: img
                        });

                        var score = checkQuerySelector('.score-a').textContent;
                        var color = checkQuerySelector('.status__update').style.backgroundColor;
                        var updatedScore = score++;

                        var update = '<div class="status__update" style="background-color: ' + color + '"><p>Minuut: 90</p></div>';
                        
                        checkQuerySelector('.section-status').insertAdjacentHTML('afterbegin', update);
                        checkQuerySelector('.score-a').innerHTML = score.toString();

                        notification.onclick = function (e) {
                            // window.location = `http://localhost:3000/team/${team}`;
                            window.focus();
                        }
                    } else {
                        console.log(permission);
                    }
                });

            }
        }, 3500);

        setTimeout(function() {
            window.location.reload();
        }, 20000);
    }

    function checkNotification() {
        if ("Notification" in window) {
            return true;
        } else {
            alert('Your browser does not support notifications');
        }
    }

    function checkQuerySelector(query) {
        if ('querySelector' in document) {
            return document.querySelector(query);
        } else {
            query = query.substr(1);
            return document.getElementsByClassName(query)[0];
        }
    }
})();