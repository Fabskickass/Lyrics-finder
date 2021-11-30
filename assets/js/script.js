function searchArtist(searchTerm) {
   apiUrl = "https://itunes.apple.com/search?term=" + searchTerm;
   fetch(apiUrl).then(function (response) {
      // console.log(response);
      // request was successful
      if (response.ok) {
         response.json().then(function (data) {
            console.log(data);

            data.results.forEach(function (item) {
               if (
                  item.artistName != undefined &&
                  item.trackName != undefined
               ) {
                  console.log(item.artistName + " — " + item.trackName);
                  var listEl = document.createElement("li");
                  listEl.innerHTML = item.artistName + " — " + item.trackName;
                  document.querySelector("#results").appendChild(listEl);
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
