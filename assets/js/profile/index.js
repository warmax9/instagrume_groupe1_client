
window.deletePost  = function deletePost(id){
    const url = "/post/" + id;
    fetch(url, {
        method: 'DELETE'
    })
        .then(response => response.text())
        .then(data => {
            if (data.error) {
                console.error('Erreur serveur :', data.error);
            }
            else {
                location.reload(true);
            }
        })
} 

window.editPost = function editPost(id, bouton){
    textarea = bouton.parentElement.parentElement.querySelector("textarea");
    
    const post = {
        "id" : id,
        "description" : textarea.value
    }
    const url = "/post/edit";
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(post),
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Erreur serveur :', data.error);
            }
            else {
                location.reload(true);
            }
        })
}