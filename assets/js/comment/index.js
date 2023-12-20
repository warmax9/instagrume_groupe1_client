function loadInputCommentaire() {
    const commentaireBouton = document.querySelectorAll('#CommenterButton');
    commentaireBouton.forEach((e) => {
        e.addEventListener('click', () => {
            const inputCommentaire = e.parentElement.querySelector("input");
            const commentaire = {
                "content": inputCommentaire.value,
                "commentaire_id": inputCommentaire.dataset.commentaireid,
                "post_id": inputCommentaire.dataset.postid
            }
            sendCommentaire(commentaire);
            inputCommentaire.value = null;
        });
    });
}

function sendCommentaire(commentaire) {
    let url = "/commentaire";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(commentaire),
    })
        .then(response => response.text())
        .then(data => {
            if (data.error) {
                console.error('Erreur serveur :', data.error);
            }
            else {
                const container = document.getElementById("containerCommentaire");
                container.innerHTML = data;
                newListLike();
                loadInputCommentaire();
            }
        })
}

function newListLike() {
    var likes = document.querySelectorAll(".like:not(.dislike),.dislike:not(.like)");
    likes.forEach((e) => {
        e.addEventListener('click', () => {
            const value = {
                "value": e.classList.contains('like'),
                "post_id": e.dataset.postid,
                "user_id": e.dataset.userid,
                "commentaire_id": e.dataset.commentaireid
            };
            sendLike(value, e.previousElementSibling, e);
        });
    });
}


function sendLike(value, element, icon) {
    const currentNumber = parseInt(element.textContent, 10);
    let url = (value.post_id !== undefined) ? '/like/post' : '/like/commentaire';
    fetch(url, {
        method: 'POST',
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
                        const divParent = element.parentElement.parentElement;
                        if (element.classList.contains('cpt-like')) {
                            const otherCpt = divParent.querySelector(".cpt-dislike");
                            otherCpt.textContent = parseInt(otherCpt.textContent, 10) - 1;
                            otherIcon = divParent.querySelector('ion-icon.dislike');
                            otherIcon.style.color = "white";
                            element.textContent = currentNumber + 1;
                            icon.style.color = "red";
                        }
                        else {
                            const otherCpt = divParent.querySelector(".cpt-like");
                            otherCpt.textContent = parseInt(otherCpt.textContent, 10) - 1;
                            otherIcon = divParent.querySelector('ion-icon.like');
                            otherIcon.style.color = "white";
                            element.textContent = currentNumber + 1;
                            icon.style.color = "red";
                        }
                        break;
                    default:
                        if (currentNumber > 0) {
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
newListLike();
loadInputCommentaire();

window.displayInputComment = function displayInputComment(img) {
    const divGrandParent = img.parentElement.parentElement;
    var divInput = divGrandParent.parentElement.querySelector(".input-container");
    if(divInput.classList.contains("d-none")){
        divInput.classList.remove("d-none");
    }
    else{
        divInput.classList.add("d-none");
    }
}

window.deleteCommenaire = function deleteCommenaire(commentaireId, postId){
    const url = "/commentaire/" + commentaireId;
    fetch(url, {
        method: 'DELETE'
    })
        .then(response => response.text())
        .then(data => {
            if (data.error) {
                console.error('Erreur serveur :', data.error);
            }
            else {
                refreshComments(postId);
            }
        })
}

function refreshComments(postId){
    const url = "/commentaire/" + postId;
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.text())
        .then(data => {
            if (data.error) {
                console.error('Erreur serveur :', data.error);
            }
            else {
                const container = document.getElementById("containerCommentaire");
                container.innerHTML = data;
            }
        })
}

window.closePopup = function closePopup(){
    var popup = document.getElementById("container_popup");
    popup.style.display = "none";
}

window.displayPopup = function displayPopup(id, content , postId){
    var popup = document.getElementById("container_popup");
    popup.style.display = "block";
    var textarea = document.getElementById("popup_textarea");
    textarea.value = content;
    textarea.dataset.id = id;
    textarea.dataset.postId = postId;
}

window.updateCommentaire = function updateCommentaire(){
    const textarea = document.getElementById("popup_textarea")
    const commentaire = {
        "id" : textarea.dataset.id,
        "content" : textarea.value
    }
    const url = "/commentaire";
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(commentaire),
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Erreur serveur :', data.error);
            }
            else {
                //refreshComments(textarea.dataset.postid);
                console.log("ok");
            }
        })
}
