import "./styles.css";


const bodyElement = document.querySelector("body");
const buttonGenerator = document.createElement("button");
buttonGenerator.innerText = "Activar funciones"
buttonGenerator.addEventListener("click", main);

bodyElement.appendChild(buttonGenerator);


function main() {

    let data = {}


    const form = document.querySelector(".weather-form");
    const formButton = document.querySelector(".form-submit")

    form.addEventListener("submit", modifySubmit);



    function modifySubmit(event) {

        event.preventDefault();
        
        const formData = new FormData(form, formButton);
        const dataObject = Object.fromEntries(formData.entries())

        data = dataObject

        makeRequest(data);

    }


    async function makeRequest(data) {

        const api_key = "6NCEX7UPQA4T8WRSB8UEVKX3A"
        const cityName = data['city-name']
        const countryName = data['country-name']
        const location = `${cityName}`+","+`${countryName}`
        const baseURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}`

        try {

            const request = await fetch(baseURL, {
                mode: "cors"
            })

            const response = await request.json()

            console.log(response);

        }

        catch {
            console.log("woops")

        }

    }

}

