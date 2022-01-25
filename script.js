"use strict";
class Car {
    constructor(make, model, colour, mileage, price) {
        this.make = "";
        this.model = "";
        this.price = 0;
        this.mileage = 0;
        this.colour = "";
        this.make = make;
        this.model = model;
        this.price = price;
        this.mileage = mileage;
        this.colour = colour;
    }
}
let cars = [];
let makes = { Ford: [], Tesla: [], BMW: [], Vauxhall: [] };
makes.Ford = "Fiesta,Focus,KA,Mondeo,Mustang".split(",");
makes.Tesla = "3".split(",");
makes.BMW = "1 series, 3 series, m2, m3, m4".split(",");
makes.Vauxhall = "Corsa,Insignia,Astra".split(",");
let holder = $("holder");
let renderCars = function () {
    holder.innerHTML = "";
    for (let i = 0; i < cars.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        holder.appendChild(card);
        let heading = document.createElement("h1");
        heading.innerHTML = cars[i].model + " " + cars[i].make;
        card.appendChild(heading);
        let price = document.createElement("p");
        price.innerHTML = `Costs: £${cars[i].price}`;
        card.appendChild(price);
        let mileage = document.createElement("p");
        mileage.innerHTML = `Mileage: ${cars[i].mileage}`;
        card.appendChild(mileage);
        let colour = document.createElement("p");
        colour.innerHTML = `Colour: ${cars[i].colour}`;
        card.appendChild(colour);
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.innerHTML = "delete";
        card.appendChild(deleteBtn);
        deleteBtn.onclick = function () {
            card.remove();
            cars.splice(1);
            save();
        };
    }
    //images
    // let image = document.createElement("img")
    // image.classList.add("image")
    // card.appendChild(image)
    // image.src= `${cars.image}`;
};
cars = JSON.parse(localStorage.getItem("cars"));
if (cars == null) {
    cars = generateRandomCars(makes, 5);
    save();
}
cars.push(new Car("BMW", "2 series", "blue", 50432, 23469));
function save() {
    let carsString = JSON.stringify(cars);
    localStorage.setItem("cars", carsString);
}
function addCar() {
    let model = $("Model").value;
    let make = $("Make").value;
    let price = parseInt($("Price").value);
    let mileage = parseInt($("Mileage").value);
    let colour = $("Colour").value;
    let car = { model: model, make: make, price: price, mileage: mileage, colour: colour };
    cars.push(car);
    renderCars();
    save();
}
function $(id) { return document.getElementById(id); }
function randomPic() {
    //returns a random car image URL
    let picsBMW = [];
    let picsFord = [];
    let picsVauxhall = [];
    let picsTesla = [];
    picsBMW.push("bmw1series.jpg");
    picsBMW.push("bmw3series.jpg");
    picsBMW.push("bmwm2.jpg");
    picsBMW.push("bmwm3.jpg");
    picsBMW.push("bmwm4.jpg");
    picsFord.push("fordfiesta.jpg");
    picsFord.push("fordfocus.jpg");
    picsFord.push("fordmondeo.jpg");
    picsFord.push("fordka.jpg");
    picsFord.push("fordmustang.jpg");
    picsVauxhall.push("vAstra.jpg");
    picsVauxhall.push("vCorsa.jpg");
    picsVauxhall.push("vInsignia.jpg");
    picsVauxhall.push("vMeriva.jpg");
    picsTesla.push("tesla3.jpg");
    return pickFrom(picsBMW);
}
function generateRandomCars(makes, numCars) {
    let cars = [];
    let colour = "blue,red,yellow,green,pink,purple,white,blck,silver,grey".split(",");
    for (let i = 0; i < numCars; i++) {
        let make = pickFrom(Object.keys(makes)); //Pick a manufacturer from the makes object
        let model = pickFrom(makes[make]);
        cars.push({ make: make, model: model, price: randomInteger(10000), mileage: randomInteger(100000), colour: pickFrom(colour) });
    }
    return cars; //send back the 'complete' list of cars
}
// a generic function to return a random selection from ANY array (i choose to pass it)
function pickFrom(list) {
    let r = Math.floor(Math.random() * list.length); // generate a random number between 0 and the list length (-1)
    return list[r]; //return the chosen item 
}
function randomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}
let saveBtn = $("save");
saveBtn.addEventListener("click", addCar);
let selectColour = $("selectColour");
selectColour.addEventListener("change", filterByColour);
function filterByColour() {
    cars = cars.filter((c) => c.colour == $("selectColour").value);
}
renderCars();
save();
//# sourceMappingURL=script.js.map