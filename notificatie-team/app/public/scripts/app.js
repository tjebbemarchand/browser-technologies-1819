(function () {
    if (window.location.pathname.includes('team')) {
        function sendNotification() {
            const notificationTimeout = setTimeout(function() {
                var img = checkQuerySelector('.team-a').src;
                var team = checkQuerySelector('.current-team').textContent;
                var text = `${team} heeft gescoord!`;
                var notification = new Notification('Voetbal update', {
                    body: text,
                    icon: img
                });

                clearTimeout(notificationTimeout);

                var scoreA = checkQuerySelector('.score-a').textContent;
                var scoreB = checkQuerySelector('.score-b').textContent;
                var color = checkQuerySelector('.status__update').style.backgroundColor;
                var updatedScore = parseInt(scoreA) + 1;

                var update = '<div class="status__update" style="background-color: ' + color + '"><p>Minuut: 90: <span>' + team + ' heeft gescoord. Ze hebben nu ' + updatedScore + ' doelpunt(en)</span></p></div>';
                
                checkQuerySelector('.section-status').insertAdjacentHTML('afterbegin', update);
                checkQuerySelector('.score-a').innerHTML = updatedScore.toString();

                notification.onclick = function (e) {
                    window.focus();
                }
            }, 3500);
        }

        window.onload = function() {
            if(Notification.permission === 'default') {
                document.querySelector('.section-current-scores').insertAdjacentHTML('beforebegin', `<h3 style="text-align:center;">Do you want to receive notifications for your favorite team? <a href="" class="notification-message">Click here...</a></h3>`);
    
                document.querySelector('.notification-message').addEventListener('click', function(e) {
                    e.preventDefault();
                    enableNotifications();

                    const notificationMessage = document.querySelector('h3');
                    notificationMessage.parentNode.removeChild(notificationMessage);
                });
            } else if(Notification.permission === 'granted') {
                enableNotifications();
            }

            function enableNotifications() {
                if(checkNotification()) {
                    if(Notification.permission === 'default') {
                        Notification.requestPermission(function (permission) {
                            if(permission === 'granted') {
                                sendNotification();
                            }
                        });
                    } else if(Notification.permission === 'granted') {
                        sendNotification();
                    } else {
                        console.log(Notification.permission);
                    }
                } else {
                    var email = prompt('Sorry your browser doesn\'t support notification. If you want to receive an email, fill the box below.');
    
                    if(email !== null) {
                        console.log(email);
                    } else {
                        alert('Email is not filled correctly. Please try again');
                    }
                }
            }
        }
        setInterval(function() {
            window.location.reload(); 
        }, 60000);
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