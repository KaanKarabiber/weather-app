import { extractData, getWeatherData } from '.';
import { chooseIcon } from './weatherIcons';

export async function initializeFormHandler() {
  const form = document.querySelector('form');
  const inputText = document.querySelector('input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    (async () => {
      try {
        const data = await getWeatherData(inputText.value);
        const { currentConditions, dayArray } = extractData(data);
        chooseIcon(currentConditions, dayArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  });
}
