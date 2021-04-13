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
    .then(data => {
        console.log(data)
        for(let i in data["albums"]){
            var node = document.createElement("li");
            var textnode = document.createTextNode(data["albums"][i]);
            node.appendChild(textnode);
            document.getElementById("albums").appendChild(node);
        }
        for(let i in data["artists"]){
            var node = document.createElement("li");
            var textnode = document.createTextNode(data["artists"][i]);
            node.appendChild(textnode);
            document.getElementById("artists").appendChild(node);
        }
    })
}


document.getElementById("get-recs").onclick = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3030/get-recommendations', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
}

document.getElementById("create-playlist").onclick = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3030/login', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    })
}