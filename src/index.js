import './styles.css';
import { CurrentConditions, Days, Hours } from './constructorFunctions';
import { initializeFormHandler } from './form';
import './switchHandler';

const WEATHERAPIKEY = 'GRUJ8YUSWV9C7U29H4QTGHSUX';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
export async function getWeatherData(location) {
  try {
    const today = getToday();
    const futureDateUnformat = new Date();
    futureDateUnformat.setDate(futureDateUnformat.getDate() + 6);
    const futureDate = futureDateUnformat.toISOString().split('T')[0];
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${futureDate}?key=${WEATHERAPIKEY}`,
      { mode: 'cors' }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
  }
}
function getToday() {
  const todayUnformatted = new Date();
  const today = todayUnformatted.toISOString().split('T')[0];

  return today;
}
export function changeIconCamelCase(icon) {
  const camelCaseIconId = icon
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/-/g, '');
  return camelCaseIconId;
}
export function extractData(data) {
  const currentConditions = new CurrentConditions(
    data.currentConditions.conditions,
    data.resolvedAddress,
    data.currentConditions.temp,
    data.currentConditions.temp,
    data.currentConditions.feelslike,
    data.currentConditions.feelslike,
    data.currentConditions.windspeed,
    data.currentConditions.windspeed,
    data.currentConditions.humidity,
    data.currentConditions.precipprob,
    data.description,
    data.currentConditions.sunrise,
    data.currentConditions.sunset,
    data.currentConditions.datetime,
    data.currentConditions.icon
  );
  const dayArray = [];

  data.days.forEach((day) => {
    const hoursArray = [];
    const formattedDate = formatDate(day.datetime);
    const dayObject = new Days(
      formattedDate,
      day.conditions,
      day.precipprob,
      day.tempmax,
      day.tempmax,
      day.tempmin,
      day.tempmin,
      day.icon
    );

    day.hours.forEach((hour) => {
      const hourObject = new Hours(
        hour.datetime,
        hour.precipprob,
        hour.temp,
        hour.temp,
        hour.conditions,
        hour.icon
      );
      hoursArray.push(hourObject);
    });
    dayObject.hours = hoursArray;
    dayArray.push(dayObject);
  });

  return { currentConditions, dayArray };
}

export function roundDownValue(value) {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      console.warn('Invalid number encountered: ', value);
      return 0;
    }
  } else if (typeof value === 'string' && !/^\d+(\.\d+)?$/.test(value)) {
    console.warn('Invalid string encountered: ', value);
    return 0;
  }
  return Math.floor(parseFloat(value));
}
export function fahrenheitToCelcius(temp) {
  return Math.round(((temp - 32) * 5) / 9);
}
export function milesToKm(speed) {
  return Math.round(speed * 1.60934);
}

// const data = await getWeatherData('istanbul');
// console.log(extractData(data));
initializeFormHandler();
