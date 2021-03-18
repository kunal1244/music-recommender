document.getElementById("lastfm").onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        "lastfmid" : document.getElementById("lastfmid").value 
    }
    await fetch('http://localhost:3030/lastfm', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}