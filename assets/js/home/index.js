const like = document.querySelectorAll('.like');
const dislike = document.querySelectorAll('.dislike');

like.forEach((e) => {
    e.addEventListener('click', () => {
        const value = {
            "value": true,
            "post_id": e.dataset.postid,
            "user_id": e.dataset.userid,
            "commentaire_id": null
        };

        send(value, e.previousElementSibling);
    });
});


dislike.forEach((e) => {
    e.addEventListener('click', () => {
        const value = {
            "value": false,
            "post_id": e.dataset.postid,
            "user_id": e.dataset.userid,
            "commentaire_id": null
        };
        console.log(value);
        send(value, e.previousElementSibling);
    });
});

function send(value, element) {
    const currentNumber = parseInt(element.textContent, 10);
    fetch('/post/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Erreur serveur :', data.error);
            } else {
                switch (data.action) {
                    case "creation":
                        element.textContent = currentNumber + 1;
                        break;
                    case "modification":
                        if(element.classList.contains('cpt-like')){
                            console.log(element.parentElement.parentElement.querySelector(".cpt-dislike"));
                            var otherCpt = element.parentElement.parentElement.querySelector(".cpt-dislike");
                            otherCpt.textContent = parseInt(otherCpt.textContent, 10) - 1;
                            element.textContent = currentNumber + 1;
                        }
                        else{
                            var otherCpt = element.parentElement.parentElement.querySelector(".cpt-like");
                            otherCpt.textContent = parseInt(otherCpt.textContent, 10) - 1;
                            element.textContent = currentNumber + 1;
                        }
                        break;
                        default :
                            if(currentNumber > 0){
                                element.textContent = currentNumber - 1;
                            }
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error.message);
        });
}