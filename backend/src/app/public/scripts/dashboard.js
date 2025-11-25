const logoutButton = document.getElementById('logout');

logoutButton.onclick = async () => {
    try {
        const response =  await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        });

        if (response.redirected) {
            history.replaceState({}, {}, response.url);
            window.location.href = response.url;
        }
    } catch (error) {
        console.error(error);
    }
}

function formatDate(date) {
    const rawDate = new Date(date);
    console.log();

    const buffer = rawDate.toDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).split(' ');

    buffer.splice(0, 1);
    console.log(buffer.join(' '));
    return buffer.join(' ');
}

const eventsBlock = document.getElementById("eventsBlock");

for (let i = 0; i < received.length; i++) {
    const slot = document.createElement('div');
    const eventName = document.createElement('p');
    const date = document.createElement('p');
    eventName.innerText = received[i].name;
    const separator = document.createElement('hr');
    const formatedDate = formatDate(received[i].date);

    date.innerText =  formatedDate;
    slot.append(eventName, date, separator);
    eventsBlock.append(slot);
}

console.log(received);