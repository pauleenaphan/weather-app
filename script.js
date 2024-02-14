const subbtn = document.getElementById("subbtn");
const searchInput = document.getElementById("searchInput");

loadPage();
subbtn.addEventListener('click', ()=>{
    if(searchInput.value == ""){
        alert("Input is empty");
        return;
    }
    getWeather();
});

function loadPage(){
    document.body.style.backgroundColor = "black";
    const lArea = document.getElementById("leftArea");
    const rArea = document.getElementById("rightArea");

    const locName = document.createElement("locName");
    locName.setAttribute('id', 'locName');
    locName.textContent = "location";
    lArea.append(locName);

    const conditions = document.createElement("conditions");
    conditions.setAttribute('id', 'conditions');
    conditions.textContent = "Weather Conditions";
    lArea.append(conditions);

    const temp = document.createElement("temp");
    temp.setAttribute('id', 'temp');
    temp.textContent = "temp";
    rArea.append(temp);

    const changeScale = document.createElement('button');
    changeScale.setAttribute('id', 'changeScale')
    changeScale.textContent = "Switch to C";
    rArea.append(changeScale);
}

//Gets data from the weather api
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
    }).catch(error =>{ //catches invalid input or any other errors
        alert("not valid input");
        console.log(error);
    })
}

//Assigns the data from weather api to each of our variables
function changeValue(response){
    locName.textContent = (response.location.name);
    if(changeScale.textContent == "Switch to F"){
        temp.textContent = (response.current.temp_c);
    }else{
        temp.textContent = (response.current.temp_f);
    }
    conditions.textContent = (response.current.condition.text);

    if(response.current.is_day == 1){
        console.log("daytime" + response.current.is_day);
        document.body.style.background = "lightblue";
    }else{
        console.log("nighttime" + response.current.is_day);
        document.body.style.opacity = "";
        document.body.style.backgroundImage = "url(https://media.giphy.com/media/3ohhwNqFMnb7wZgNnq/giphy.gif?cid=ecf05e47gddr15v4wjajgcnkc5ivptbg0v68xvvng39np4jp&ep=v1_gifs_search&rid=giphy.gif&ct=g)";
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