import clearDayImage from './assets/clear-day.svg';
import rainImage from './assets/rain.svg';
import snowImage from './assets/snow.svg';
import fogImage from './assets/fog.svg';
import windImage from './assets/wind.svg';
import cloudyImage from './assets/cloudy.svg';
import partlyCloudyDayImage from './assets/partly-cloudy-day.svg';
import partlyCloudyNightImage from './assets/partly-cloudy-night.svg';
import clearNight from './assets/clear-night.svg';
import thunderRainImage from './assets/thunderstorms-rain.svg';
import thunderRainDayImage from './assets/thunderstorms-day-rain.svg';
import thunderRainNight from './assets/thunderstorms-night-rain.svg';

export const weatherIconMapping = {
  snow: snowImage,
  rain: rainImage,
  fog: fogImage,
  wind: windImage,
  cloudy: cloudyImage,
  partlyCloudyDay: partlyCloudyDayImage,
  partlyCloudyNight: partlyCloudyNightImage,
  clearDay: clearDayImage,
  clearNight: clearNight,
  snowShowersDay: snowImage,
  snowShowersNight: snowImage,
  thunderRain: thunderRainImage,
  thunderShowersDay: thunderRainDayImage,
  thunderShowersNight: thunderRainNight,
  showersDay: rainImage,
  showersNight: rainImage,
};

export function chooseIcon(currentConditions, dayArray) {
  const currentConditionImg = document.querySelector('#current-condition-img');
  currentConditionImg.src = weatherIconMapping[currentConditions.icon];

  const daysImage = document.querySelectorAll('.days-image');
  dayArray.forEach((day, index) => {
    if (index < daysImage.length) {
      daysImage[index].src = weatherIconMapping[day.icon];
    }
  });

  const hourlyWeatherContainer = document.querySelectorAll('.hours-image');
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
    if (i < hourlyWeatherContainer.length) {
      hourlyWeatherContainer[i].src = weatherIconMapping[currentHourData.icon];
    }
    currentHourIndex++;
  }
}
