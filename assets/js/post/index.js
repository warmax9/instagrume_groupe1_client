const btnLock = document.querySelectorAll('#btn-lock');
const btnDel = document.querySelectorAll('#btn-del');

btnLock.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = {
            "id": btn.dataset.id,
            "is_open": btn.dataset.value
        }
        console.log(value);
        fetch('/post/edit',
        {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(() => {
            console.log('tkt')
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