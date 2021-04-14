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
        document.getElementById("h-albums").style.display = "block";
        document.getElementById("h-artists").style.display = "block";
        document.getElementById("get-recs").style.display = "block";
        document.getElementById("lastfm").style.display="none";
        for(let i in data["albums"].slice(0, 10)){
            var node = document.createElement("li");
            var textnode = document.createTextNode(data["albums"][i]);
            node.appendChild(textnode);
            document.getElementById("albums").appendChild(node);
        }
        for(let i in data["artists"].slice(0, 10)){
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
    }).then(response => response.json())
    .then(data => alert(data.message));
}
