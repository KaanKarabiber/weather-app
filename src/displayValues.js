export function displayValues(currentConditions, dayArray) {
  const currentConditionsP = document.querySelector('#current-conditions-p');
  currentConditionsP.textContent = currentConditions.conditions;

  const resolvedAddress = document.querySelector('#resolved-address');
  resolvedAddress.textContent = currentConditions.resolvedAddress;

  const feelsLike = document.querySelector('#feels-like');
  feelsLike.textContent = currentConditions.feelsLike;

  const windSpeed = document.querySelector('#wind-speed');
  windSpeed.textContent = currentConditions.windSpeed;

  const precipProbCurrent = document.querySelector('#precip-prob-current-p');
  precipProbCurrent.textContent = currentConditions.precipProbCurrent;

  const sunrise = document.querySelector('#sunrise-p');
  sunrise.textContent = currentConditions.sunrise;

  const sunset = document.querySelector('#sunset-p');
  sunset.textContent = currentConditions.sunset;

  const dateTime = document.querySelector('#date-time-current');
  dateTime.textContent = currentConditions.dateTime;

  const dayContainer = document.querySelectorAll('.day-container');
  dayArray.forEach((day, index) => {
    const conditions = document.createElement('p');
    conditions.textContent = day.condition;
    conditions.classList.add('day-conditions');

    const date = document.createElement('p');
    if (index === 0) date.textContent = 'Today';
    else if (index === 1) date.textContent = 'Tomorrow';
    else date.textContent = day.date;

    const precipProb = document.createElement('p');
    precipProb.textContent = `%${day.preciProb};`;

    const tempMax = document.createElement('p');
    tempMax.textContent = `Max: ${day.tempmax}`;
    const tempMin = document.createElement('p');
    tempMin.textContent = `Min: ${day.tempmin}`;

    dayContainer[index].append(conditions, date, precipProb, tempMax, tempMin);
  });
  const hourContainer = document.querySelectorAll('.hour-container');
  const hoursToDisplay = 24;
  const currentHour = parseInt(currentConditions.dateTime.slice(0, 2));

  let currentDayIndex = 0;
  let currentHourIndex = currentHour;

  for (let i = 0; i < hoursToDisplay; i++) {
    if (currentHourIndex >= 24) {
      currentDayIndex++;
      currentHourIndex = 0;
    }
    const currentHourData = dayArray[currentDayIndex].hours[currentHourIndex];

    const condition = document.createElement('p');
    condition.textContent = currentHourData.condition;

    const time = document.createElement('p');
    time.textContent = currentHourData.dateTime;

    const precipProb = document.createElement('p');
    precipProb.textContent = `%${currentHourData.preciProb}`;

    const temp = document.createElement('p');
    temp.textContent = `${currentHourData.temp}`;

    console.log(currentHourData);
    currentHourIndex++;
    hourContainer[i].append(condition, time, precipProb, temp);
  }
}
