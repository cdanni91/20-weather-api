import "./styles.css";


// test element
// const body = document.querySelector("body");
// const element = document.createElement("div")

// element.innerText = "Hola"

// body.appendChild(element);

const location = "London,UK"
const api_key = "6NCEX7UPQA4T8WRSB8UEVKX3A"

const baseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}`


const req = fetch(baseURL, {
    mode: "cors"
})
.then(response => response.json())
.then(data => console.log(data));

