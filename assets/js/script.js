function searchArtist(searchTerm) {
  apiUrl = "https://itunes.apple.com/search?term=" + searchTerm;
  fetch(apiUrl).then(function (response) {
    // console.log(response);
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        data.results.forEach(function (item) {
          if (item.artistName != undefined && item.trackName != undefined) {
            console.log(item.artistName + " — " + item.trackName);
            var listEl = document.createElement("li");
            //add class name to "li"
            listEl.innerHTML = item.artistName + " — " + item.trackName;
            document.querySelector("#results").appendChild(listEl);
          } else {
            item.artistName == undefined || item.trackName == undefined;
            console.log(error);
            var listError = document.createElement("div");
            listError.innerHTML = "Artist or song not found!";
            document.querySelector("#results").appendChild(listError);
          }
        });
      });
    }
  });
}

document.querySelector("#searchBtn").addEventListener("click", function () {
  var userInput = document.querySelector("#InputFromUser").value;
  document.querySelector("#InputFromUser").value = "";
  searchArtist(userInput);
});

function searchLyrics(lyricSearch) {
  lyricsUrl = "https://api.lyrics.ovh/v1/" + lyricSearch;
  fetch(lyricsUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var songLyrics = data.lyrics;
        document.querySelector("#lyrics").innerHTML = songLyrics.replaceAll(
          "\n",
          "<br>"
        );
      });
    }
  });
}

document.querySelector("#results").addEventListener("click", function (event) {
  console.log(event.target.textContent);
  var songInfo = event.target.textContent.replace(" — ", "/");
  searchLyrics(songInfo);
  var songInfo = event.target.textContent;

  storage.push(songInfo);
  localStorage.setItem("songObject", JSON.stringify(storage));
});

var storage = JSON.parse(localStorage.getItem("songObject"));
if (storage === null) {
  storage = [];
}
