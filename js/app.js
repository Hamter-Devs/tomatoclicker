const addtomatoes = document.getElementById("addtomatoes");
const addmultiplier = document.getElementById("addmultiplier");
const addtps = document.getElementById("addtps");

const tomatocounter = document.getElementById("tomatocounter");
const extrastats = document.getElementById("extrastats");

const nameplate = document.getElementById("nameplate");
const editname = document.getElementById("editname");
let playername = getCookie("playername") || "Player";

const devtools = document.getElementById("devtools");
const settomatoes = document.getElementById("settomatoes");
const setmultiplier = document.getElementById("setmultiplier");
const settps = document.getElementById("settps");
const reset = document.getElementById("reset");

let tomatoes = parseInt(getCookie("tomatoes")) || 0;
let multiplier = parseInt(getCookie("multiplier")) || 1;
let tps = parseInt(getCookie("tps")) || 0;

let multiplier_cost = multiplier * 100;
let tps_cost = tps * 50;

function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function tick() {
    tomatoes += tps * multiplier;
    updatePage();
}

function updatePage() {
    if (playername == "ඞ") {
        devtools.hidden = false;
    } else {
        devtools.hidden = true;
    }
    if (multiplier_cost > tomatoes) {
        addmultiplier.disabled = true;
    } else {
        addmultiplier.disabled = false;
    }
    if (tps_cost > tomatoes) {
        addtps.disabled = true;
    } else {
        addtps.disabled = false;
    }
    settomatoes.innerHTML = "Set tomatoes";
    setmultiplier.innerHTML = "Set multiplier";
    settps.innerHTML = "Set tomatoes per second";
    reset.innerHTML = "Reset";
    setCookie("playername", playername);
    setCookie("tomatoes", tomatoes);
    setCookie("multiplier", multiplier);
    setCookie("tps", tps);
    addtomatoes.innerHTML = `Add ${multiplier} tomato${multiplier !== 1 ? 'es' : ''}`;
    multiplier_cost = multiplier * 100;
    addmultiplier.innerHTML = `Add +1 multiplier (${multiplier_cost} tomatoes)`;
    tps_cost = tps * 50;
    if (tps == 0) {
        tps_cost = 50;
    }
    if (tps == 1) {
        tps_cost = 100;
    }
    addtps.innerHTML = `Add +1 tomatoes per second (${tps_cost} tomatoes)`;
    tomatocounter.innerHTML = `${tomatoes} tomato${tomatoes !== 1 ? 'es' : ''}`;
    extrastats.innerHTML = `${multiplier} multiplier | ${tps} tomatoes per second`;
    nameplate.innerHTML = `${playername}co`
    editname.innerHTML = "Change name"
}

addtomatoes.onclick = function() {
    tomatoes += multiplier;
    updatePage();
}

addmultiplier.onclick = function() {
    tomatoes -= multiplier_cost;
    multiplier += 1;
    updatePage();
}

addtps.onclick = function() {
    tomatoes -= tps_cost;
    tps += 1;
    updatePage();
}

editname.onclick = function() {
    playername = prompt("New name", playername);
    updatePage();
}

settomatoes.onclick = function() {
    tomatoes = prompt("New tomatoes", toString(tomatoes));
    updatePage();
}

setmultiplier.onclick = function() {
    multiplier = prompt("New multiplier", toString(multiplier));
    updatePage();
}

settps.onclick = function() {
    tps = prompt("New tomatoes per second", toString(tps));
    updatePage();
}

reset.onclick = function() {
    setCookie("tomatoes", "0");
    setCookie("multiplier", "1");
    setCookie("tps", "0");
    setCookie("playername", "Player");
    window.location.reload();
}

setInterval(tick, 1000);
updatePage();
