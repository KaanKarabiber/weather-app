import './styles.css';
import { CurrentConditions, Days, Hours } from './constructorFunctions';
import { initializeFormHandler } from './form';

const WEATHERAPIKEY = 'GRUJ8YUSWV9C7U29H4QTGHSUX';

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
function changeIconCamelCase(icon) {
  const camelCaseIconId = icon
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/-/g, '');
  return camelCaseIconId;
}
export function extractData(data) {
  const currentConditions = new CurrentConditions(
    data.currentConditions.conditions,
    data.resolvedAddress,
    data.currentConditions.feelslike,
    data.currentConditions.windspeed,
    data.currentConditions.humidity,
    data.currentConditions.precipprob,
    data.description,
    data.currentConditions.sunrise,
    data.currentConditions.sunset,
    data.currentConditions.datetime,
    changeIconCamelCase(data.currentConditions.icon)
  );
  const dayArray = [];

  data.days.forEach((day) => {
    const hoursArray = [];

    const dayObject = new Days(
      day.datetime,
      day.conditions,
      day.precipprob,
      day.tempmax,
      day.tempmin,
      changeIconCamelCase(day.icon)
    );

    day.hours.forEach((hour) => {
      const hourObject = new Hours(
        hour.datetime,
        hour.precipprob,
        hour.temp,
        hour.conditions,
        hour.icon
      );
      hourObject.icon = changeIconCamelCase(hourObject.icon);
      hoursArray.push(hourObject);
    });

    dayObject.hours = hoursArray;

    dayArray.push(dayObject);
  });
  return { currentConditions, dayArray };
}
initializeFormHandler();
// const data = await getWeatherData('istanbul');
// console.log(data);
// console.log(extractData(data));
