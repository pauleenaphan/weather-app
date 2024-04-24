const changeScale = document.getElementById("changeScale");
const userInput = document.getElementById("userInput");
const currTemp = document.getElementById("currTemp");

function getFormattedDate() {
    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

    var today = new Date();
    var month = months[today.getMonth()];
    var day = today.getDate();
    var year = today.getFullYear();

    return month + ' ' + day + ', ' + year;
}

//Gets data from the weather api
function getWeather(){
    event.preventDefault();
    console.log("this is uer input", userInput.value);
    var key = "f43a52fb673f4315a9d41653241202";

    fetch(("http://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + userInput.value), {mode: 'cors'})
    .then(function(response){
        //this processes the JSON data we are getting
        return response.json();
    })
    .then(function(response){
        console.log(response.current.temp_f);
        changeValue(response);
    }).catch(error =>{ //catches invalid input or any other errors
        console.log(error);
    })
}

//Assigns the data from weather api to each of our variables
function changeValue(response){
    document.getElementById("location").innerHTML = (response.location.name);
    document.getElementById("date").innerHTML = getFormattedDate();
    document.getElementById("windSpeed").innerHTML = "Wind Speed: " + response.current.wind_mph;
    document.getElementById("uvIndex").innerHTML = "UV: " + response.current.uv;
    document.getElementById("cloudCoverage").innerHTML = "Cloud Coverage: " + response.current.cloud + "%";

    //checks the button to change it
    if(changeScale.textContent == "Switch to F"){
        currTemp.innerHTML = (response.current.temp_c) + "℃";
    }else{
        currTemp.innerHTML = (response.current.temp_f) + "℉";
    }
    document.getElementById("conditions").innerHTML = (response.current.condition.text);

    //if it is morning, set the background to the sun, else set it to the moon
    if(response.current.is_day == 1){
        console.log("daytime" + response.current.is_day);
        document.body.style.backgroundImage = "url('../img/sun.gif')";
        document.body.style.backgroundSize = "20%";
    }else{
        console.log("nighttime" + response.current.is_day);
        document.body.style.backgroundImage = "url('../img/moon.gif')";
        document.body.style.backgroundSize = "20%";
    }
}

//switches the button text and calls getWeather to change the value
changeScale.addEventListener('click', ()=>{
    if(changeScale.textContent == "Switch to C"){
        changeScale.textContent = "Switch to F";
    }else{
        changeScale.textContent = "Switch to C";
    }
    //need to call getWeather in order to change the value of conditions 
    getWeather();
})