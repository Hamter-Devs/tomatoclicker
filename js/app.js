const addtomatoes = document.getElementById("addtomatoes");
const tomatocounter = document.getElementById("tomatocounter");
let tomatoes = parseInt(getCookie("tomatoes")) || 0; // Use parseInt to convert string to number
let multiplier = parseInt(getCookie("multiplier")) || 1; // Default multiplier to 1 if not set

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
    addtomatoes.innerHTML = `Add ${multiplier} tomato${multiplier !== 1 ? 'es' : ''}`;
    tomatocounter.innerHTML = `${tomatoes} tomato${tomatoes !== 1 ? 'es' : ''}`;
    setCookie("tomatoes", tomatoes);
    setCookie("multiplier", multiplier);
}

addtomatoes.onclick = function() {
    tomatoes += multiplier;
    updatePage();
}

updatePage();
