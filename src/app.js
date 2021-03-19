document.getElementById("lastfm").onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        "lastfmid" : document.getElementById("lastfmid").value 
    }
    fetch('http://localhost:3030/lastfm', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }).then(response => response.json())
    .then(data => console.log(data))
}