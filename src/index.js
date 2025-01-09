import './styles.css';
import { CurrentConditions, Days, Hours } from './constructorFunctions';
import { initializeFormHandler } from './form';
const WEATHERAPIKEY = 'GRUJ8YUSWV9C7U29H4QTGHSUX';

async function getWeatherData(location) {
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
export async function extractData(location) {
  const data = await getWeatherData(location);
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
    data.currentConditions.datetime
  );
  const dayArray = [];

  data.days.forEach((day) => {
    const hoursArray = [];

    const dayObject = new Days(
      day.datetime,
      day.conditions,
      day.precipprob,
      day.tempmax,
      day.tempmin
    );

    day.hours.forEach((hour) => {
      const hourObject = new Hours(
        hour.datetime,
        hour.precipprob,
        hour.temp,
        hour.conditions
      );
      hoursArray.push(hourObject);
    });

    dayObject.hours = hoursArray;

    dayArray.push(dayObject);
  });
  return { currentConditions, dayArray };
}
// const { currentConditions, dayArray } = await extractData('istanbul');
// console.log(currentConditions, dayArray);
initializeFormHandler();
