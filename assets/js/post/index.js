const btnLock = document.querySelectorAll('#btn-lock');
const btnDel = document.querySelectorAll('#btn-del');

btnLock.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = {
            "id": new Number(btn.dataset.id),
            "is_open": new Boolean(btn.dataset.value)
        }
        fetch('/post/edit',
        {
            method: 'POST',
            body: JSON.stringify(value),
        })
        .then(() => {
            console.log(JSON.stringify(value))
            location.reload()
        });
    })
})

btnDel.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = {
            "id": btn.dataset.id,
            "del": true
        }
        fetch('/post', {
            method: 'POST',
            body: JSON.stringify(value)
        });
    })
})