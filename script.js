window.addEventListener("load", function() {
   let missionTarget = document.getElementById("missionTarget");
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            let index = Math.floor(Math.random()*json.length);
            let planet = json[index];
            missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planet.name}</li>
               <li>Diameter: ${planet.diameter}</li>
               <li>Star: ${planet.star}</li>
               <li>Distance from Earth: ${planet.distance}</li>
               <li>Number of Moons: ${planet.moons}</li>
            </ol>
            <img src="${planet.image}">`
         });
   });
   
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilot = document.querySelector("input[name=pilotName]");
      let copilot = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      let letters = /^[A-Za-z]+$/;
      let numbers = /^[0-9]+$/;
      let pilotStatus = document.getElementById("pilotStatus");
      let copilotStatus = document.getElementById("copilotStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let faultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      
      if (pilot.value === "" || copilot.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
         event.preventDefault();
      } else if (!fuelLevel.value.match(numbers) || !cargoMass.value.match(numbers) || !pilot.value.match(letters) || !copilot.value.match(letters)) {
         alert("Please provide information in correct format.");
         event.preventDefault();
      } else {
         pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilot.value} is ready for launch`;
         faultyItems.style = "visibility: visible";
         launchStatus.innerHTML = `Shuttle ready for launch`;
         launchStatus.style = "color: green";
         if (fuelLevel.value < 10000) {
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style = "color: red";
         }
         if (cargoMass.value > 10000) {
         cargoStatus.innerHTML = `Cargo mass too high for launch`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style = "color: red";
         }
         event.preventDefault();
      }
   }); 
});
