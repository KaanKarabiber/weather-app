import { displayValues } from './displayValues';

const toggleSwitch = document.querySelector('#toggle-switch');

let currentWeatherData = null;
let dayArrayData = null;

document.addEventListener('weatherDataUpdated', (event) => {
  const { currentConditions, dayArray } = event.detail;
  currentWeatherData = currentConditions;
  dayArrayData = dayArray;
  console.log('Weather data updated:', currentWeatherData, dayArrayData);
});

toggleSwitch.addEventListener('change', function () {
  displayValues(currentWeatherData, dayArrayData);
});
