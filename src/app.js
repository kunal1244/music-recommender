var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  })

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
        document.getElementById("heading").innerText = "Hello, " + document.getElementById("lastfmid").value + "!";
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
    document.getElementById("spinner").style.display = "block";
    e.preventDefault();
    fetch('http://localhost:3030/get-recommendations', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById("spinner").style.display = "none";
    });
}
