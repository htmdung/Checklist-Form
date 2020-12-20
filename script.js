/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener('load', function() {
   let launchForm = document.getElementById('launchForm');
   let faultyItems = document.getElementById('faultyItems');
   let pilotName = document.querySelector('input[name="pilotName"]');
   let copilotName = document.querySelector('input[name="copilotName"]');
   let fuelLevel = document.querySelector('input[name="fuelLevel"]');
   let cargoMass = document.querySelector('input[name="cargoMass"]');
   let fuelStatus = document.getElementById('fuelStatus');
   let launchStatus = document.getElementById('launchStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let missionTarget = document.getElementById('missionTarget');

   

   launchForm.addEventListener('submit', function(event) {
      event.preventDefault(); 

      fuelStatus.textContent = '';

      if (
         pilotName.value === '' ||
         copilotName.value === '' ||
         fuelLevel.value === '' ||
         cargoMass.value === ''
      ) {
         alert('All fields are required');
      }

      pilotStatus.textContent = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.textContent = `Co-pilot ${copilotName.value} is ready for launch`;


      if (isNaN(Number(fuelLevel.value))) {
         alert('fuelLevel field must be a number');
      }

      if (isNaN(Number(cargoMass.value))) {
         alert('cargoMass field must be a number');
      }
      
      faultyItems.style.visibility = 'visible';

      if (fuelLevel.value < 10000) {
         fuelStatus.textContent = 'Fuel level too low for launch';
         launchStatus.textContent = 'Shuttle not ready for launch';
         launchStatus.style.color = 'red';
      } else {
         fuelStatus.textContent = 'Fuel level enough for launch';
      }

      if (cargoMass.value > 10000) {
         cargoStatus.textContent = 'There is too much mass for the shuttle to take off';
         launchStatus.textContent = 'Shuttle not ready for launch';
         launchStatus.style.color = 'red';
      } else {
         cargoStatus.textContent = 'Cargo mass low enough for launch';
      }
      
      if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
         launchStatus.textContent = 'Shuttle is ready for launch';
         launchStatus.style.color = 'green';

         fetch('https://handlers.education.launchcode.org/static/planets.json')
            .then(function(response) {
               return response.json();
            })
            .then(function(planets) {
               let planet = planets[0];
               let html = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${planet.name}</li>
                     <li>Diameter: ${planet.diameter}</li>
                     <li>Star: ${planet.star}</li>
                     <li>Distance from Earth: ${planet.distance}</li>
                     <li>Number of Moons: ${planet.moons}</li>
                  </ol>
                  <img src="${planet.image}">
               `;
               missionTarget.innerHTML = html;
            })
      }
   });


});
