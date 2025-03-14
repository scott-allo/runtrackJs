
const rawData =`{
    "name":"La Plateforme_",
    "address":"8 rue d'hozier",
    "city":"Marseille",
    "nb_staff":"11",
    "creation":"2019"
}`;

console.log(typeof rawData,'type rawdata')
let jsonData = JSON.parse(rawData);
console.log(typeof jsonData,'type of jsonData')
let city = jsonData["city"];

console.log("the city is: " + city);

