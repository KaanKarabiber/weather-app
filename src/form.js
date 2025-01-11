import { chooseIcon, extractData, getWeatherData } from '.';

export async function initializeFormHandler() {
  const form = document.querySelector('form');
  const inputText = document.querySelector('input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    (async () => {
      try {
        const data = await getWeatherData(inputText.value);
        const { currentConditions, dayArray } = extractData(data);
        console.log(currentConditions, dayArray);
        chooseIcon(currentConditions, dayArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  });
}
