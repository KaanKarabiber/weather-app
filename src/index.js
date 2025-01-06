import './styles.css';
const WEATHERAPIKEY = 'GRUJ8YUSWV9C7U29H4QTGHSUX';

async function getWeatherData() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/istanbul?key=${WEATHERAPIKEY}`,
      { mode: 'cors' }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error', error);
  }
}
getWeatherData();
