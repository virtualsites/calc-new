const axios = require('axios')

function endpointResponse() {

    axios.get('https://system.smartcheck.pl/api/inspection-search-engine-price', {
            headers: {
                ContentType: "application/json",
            },
            data: {
                "country": "Krakozja",
                "amountOfDays": 2
            },
            dataType: 'json',
        })
        .then(function(response) {
            console.log(response.data)
        })
}

endpointResponse()