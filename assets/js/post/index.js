const btnLock = document.querySelectorAll('#btn-lock');
const btnDel = document.querySelectorAll('#btn-del');

btnLock.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = {
            "id": btn.dataset.id,
            "is_open": btn.dataset.value
        }
        console.log(value);
        fetch('/post',
        {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            console.log(res.json())
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