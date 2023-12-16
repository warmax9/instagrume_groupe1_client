const likes = document.querySelectorAll(".like:not(.dislike),.dislike:not(.like)");

likes.forEach((e) => {
    e.addEventListener('click', () => {
        const value = {
            "value": e.classList.contains('like'),
            "post_id": e.dataset.postid,
            "user_id": e.dataset.userid,
            "commentaire_id": e.dataset.commentaireid
        };

        send(value, e.previousElementSibling, e);
    });
});

function send(value, element, icon) {
    const currentNumber = parseInt(element.textContent, 10);
    let url = (value.post_id !== undefined) ? '/like/post' : '/like/commentaire';
    fetch(url, {
        method: 'POST',
        headers: {
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
                        icon.style.color = "red";
                        break;
                    case "modification":
                        if(element.classList.contains('cpt-like')){
                            var divParent =  element.parentElement.parentElement;
                            var otherCpt = divParent.querySelector(".cpt-dislike");
                            otherCpt.textContent = parseInt(otherCpt.textContent, 10) - 1;
                            otherIcon = divParent.querySelector('ion-icon.dislike');
                            otherIcon.removeAttribute('color');
                            otherIcon.style.color = "white";
                            element.textContent = currentNumber + 1;
                            icon.style.color = "red";
                        }
                        else{
                            var divParent =  element.parentElement.parentElement;
                            var otherCpt = divParent.querySelector(".cpt-like");
                            otherCpt.textContent = parseInt(otherCpt.textContent, 10) - 1;
                            otherIcon = divParent.querySelector('ion-icon.like');
                            otherIcon.removeAttribute('color');
                            otherIcon.style.color = "white";
                            element.textContent = currentNumber + 1;
                            icon.style.color = "red";
                        }
                        break;
                        default :
                            if(currentNumber > 0){
                                element.textContent = currentNumber - 1;
                                icon.style.color = "white";
                            }
                }
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error.message);
        });
}