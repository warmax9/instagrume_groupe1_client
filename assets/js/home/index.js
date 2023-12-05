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

        send(value);
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
        send(value);
    });
});

function send(value){
    fetch('/post/like', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(value)
    })
}