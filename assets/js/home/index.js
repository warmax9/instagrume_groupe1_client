const like = document.querySelectorAll('.like');
const dislike = document.querySelector('.dislike');


like.forEach((e) => {
    e.addEventListener('click', () => {
        const value = {
            "value": true,
            "post_id": e.dataset.postid,
            "user_id": e.dataset.userid,
            "commentaire_id": null
        };

        fetch('/post/like', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value) // Convertir l'objet en chaîne JSON
        })
        .then(response => response.json())
        .then(result => {
            console.log('Réponse du serveur:', result);
            // Traitez la réponse du serveur ici
        })
        .catch(error => {
            console.error('Erreur lors de la requête fetch:', error);
            // Gérez les erreurs ici
        });

        console.log(value);
    });
});


dislike.addEventListener('click', () => {
    console.log('coucou')
})
