const addtomatoes = document.getElementById("addtomatoes");
const addmultiplier = document.getElementById("addmultiplier");
const tomatocounter = document.getElementById("tomatocounter");
let tomatoes = parseInt(getCookie("tomatoes")) || 0;
let multiplier = parseInt(getCookie("multiplier")) || 1;
let multiplier_cost = multiplier * 100;

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

function updatePage() {
    if (multiplier_cost > tomatoes) {
        addmultiplier.disabled = true;
    } else {
        addmultiplier.disabled = false;
    }
    setCookie("tomatoes", tomatoes);
    setCookie("multiplier", multiplier);
    addtomatoes.innerHTML = `Add ${multiplier} tomato${multiplier !== 1 ? 'es' : ''}`;
    multiplier_cost = multiplier * 100;
    addmultiplier.innerHTML = `Add +1 multiplier (${multiplier_cost} tomatoes)`;
    tomatocounter.innerHTML = `${tomatoes} tomato${tomatoes !== 1 ? 'es' : ''}`;
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

setInterval(1000, updatePage);
updatePage();
