console.log('script sourced');

function getMessages() {
    fetch('/messages')
    .then((res) => res.json())
    .then(updatePage)
    .catch((error) => {
        console.error(error);
    })
}

function updatePage(messages){
    console.log('updatePage')
    let messagesDiv = document.querySelector('#messages');
    messagesDiv.innerHTML = '';
    for(let message of messages){
        messagesDiv.innerHTML += `
         <p>${message.title}</p>
         <p>${message.text}</p>
         <p>${message.timestamp}</p>
         `;
    }
}

getMessages();