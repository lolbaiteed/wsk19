document.getElementById('form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        redirect: 'follow',
    });

    
    if (!res.ok) {
        alert(JSON.stringify(await res.json()));
    } else if (res.redirected) {
        window.location.href = res.url;
    }

})