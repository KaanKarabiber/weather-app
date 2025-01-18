import {
  celciusToFahrenheit,
  fahrenheitToCelcius,
  milesToKm,
  kmToMiles,
} from './index.js';

export function displayValues(currentConditions, dayArray) {
  const toggleSwitch = document.querySelector('#toggle-switch');

  const currentConditionsP = document.querySelector('#current-conditions-p');
  currentConditionsP.textContent = currentConditions.conditions;

  const resolvedAddress = document.querySelector('#resolved-address');
  resolvedAddress.textContent = currentConditions.resolvedAddress;

  const temp = document.querySelector('#temp-current');
  temp.textContent = toggleSwitch.checked
    ? celciusToFahrenheit(currentConditions.temp)
    : fahrenheitToCelcius(currentConditions.temp);

  const feelsLike = document.querySelector('#feels-like');
  feelsLike.textContent = toggleSwitch.checked
    ? celciusToFahrenheit(currentConditions.feelsLike)
    : fahrenheitToCelcius(currentConditions.feelsLike);

  const windSpeed = document.querySelector('#wind-speed');
  windSpeed.textContent = toggleSwitch.checked
    ? kmToMiles(currentConditions.windspeed)
    : milesToKm(currentConditions.windspeed);

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
    if (dayContainer[index].querySelector('.day-conditions')) {
      dayContainer[index].querySelector('.day-conditions').textContent =
        day.condition;
    } else {
      const conditions = document.createElement('p');
      conditions.textContent = day.condition;
      conditions.classList.add('day-conditions');
      dayContainer[index].append(conditions);
    }

    if (dayContainer[index].querySelector('.day-date')) {
      const date = dayContainer[index].querySelector('.day-date');
      if (index === 0) date.textContent = 'Today';
      else if (index === 1) date.textContent = 'Tomorrow';
      else date.textContent = day.date;
    } else {
      const date = document.createElement('p');
      date.classList.add('day-date');
      if (index === 0) date.textContent = 'Today';
      else if (index === 1) date.textContent = 'Tomorrow';
      else date.textContent = day.date;
      dayContainer[index].append(date);
    }

    if (dayContainer[index].querySelector('.precip-prob-day')) {
      dayContainer[index].querySelector('.precip-prob-day').textContent =
        `%${day.preciProb}`;
    } else {
      const precipProb = document.createElement('p');
      precipProb.classList.add('precip-prob-day');
      precipProb.textContent = `%${day.preciProb}`;
      dayContainer[index].append(precipProb);
    }

    if (dayContainer[index].querySelector('.tempmax-day')) {
      dayContainer[index].querySelector('.tempmax-day').textContent =
        toggleSwitch.checked
          ? `Max: ${celciusToFahrenheit(day.tempmax)}`
          : `Max: ${fahrenheitToCelcius(day.tempmax)}`;
    } else {
      const tempMax = document.createElement('p');
      tempMax.classList.add('tempmax-day');
      tempMax.textContent = toggleSwitch.checked
        ? `Max: ${celciusToFahrenheit(day.tempmax)}`
        : `Max: ${fahrenheitToCelcius(day.tempmax)}`;
      dayContainer[index].append(tempMax);
    }

    if (dayContainer[index].querySelector('.tempmin-day')) {
      dayContainer[index].querySelector('.tempmin-day').textContent =
        toggleSwitch.checked
          ? `Min: ${celciusToFahrenheit(day.tempmin)}`
          : `Min: ${fahrenheitToCelcius(day.tempmin)}`;
    } else {
      const tempMin = document.createElement('p');
      tempMin.classList.add('tempmin-day');
      tempMin.textContent = toggleSwitch.checked
        ? `Min: ${celciusToFahrenheit(day.tempmin)}`
        : `Min: ${fahrenheitToCelcius(day.tempmin)}`;

      dayContainer[index].append(tempMin);
    }
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

    if (hourContainer[i].querySelector('.condition-hour')) {
      hourContainer[i].querySelector('.condition-hour').textContent =
        currentHourData.condition;
    } else {
      const condition = document.createElement('p');
      condition.classList.add('condition-hour');
      condition.textContent = currentHourData.condition;
      hourContainer[i].append(condition);
    }

    if (hourContainer[i].querySelector('.time-hour')) {
      hourContainer[i].querySelector('.time-hour').textContent =
        currentHourData.dateTime;
    } else {
      const time = document.createElement('p');
      time.classList.add('time-hour');
      time.textContent = currentHourData.dateTime;
      hourContainer[i].append(time);
    }

    if (hourContainer[i].querySelector('.precip-prob-hour')) {
      hourContainer[i].querySelector('.precip-prob-hour').textContent =
        `%${currentHourData.preciProb}`;
    } else {
      const precipProb = document.createElement('p');
      precipProb.classList.add('precip-prob-hour');
      precipProb.textContent = `%${currentHourData.preciProb}`;
      hourContainer[i].append(precipProb);
    }
    if (hourContainer[i].querySelector('.temp-hour')) {
      temp.textContent = toggleSwitch.checked
        ? celciusToFahrenheit(currentHourData.temp)
        : fahrenheitToCelcius(currentHourData.temp);
    } else {
      const temp = document.createElement('p');
      temp.classList.add('temp-hour');
      temp.textContent = toggleSwitch.checked
        ? celciusToFahrenheit(currentHourData.temp)
        : fahrenheitToCelcius(currentHourData.temp);
      hourContainer[i].append(temp);
    }

    currentHourIndex++;
  }
}
