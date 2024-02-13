const subbtn = document.getElementById("subbtn");
const searchInput = document.getElementById("searchInput");

loadPage();
subbtn.addEventListener('click', getWeather);

function loadPage(){
    const page = document.getElementById("page")

    const locName = document.createElement("locName");
    locName.setAttribute('id', 'locName');
    locName.textContent = "location";
    page.append(locName);

    const tempF = document.createElement("tempF");
    tempF.setAttribute('id', 'tempF');
    tempF.textContent = "tempF";
    page.append(tempF);
}




function getWeather(){
    // console.log(searchInput.value);
    var key = "f43a52fb673f4315a9d41653241202";

    fetch(("http://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + searchInput.value), {mode: 'cors'})
    .then(function(response){
        //this processes the JSON data we are getting
        return response.json();
    })
    .then(function(response){
        console.log(response.current.temp_f);
        // locName.textContent = (response.location.name);
        changeValue(response);
    })
}

function changeValue(response){
    locName.textContent = (response.location.name);
    tempF.textContent = (response.current.temp_f);
}