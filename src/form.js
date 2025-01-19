import { extractData, getWeatherData } from '.';
import { displayValues } from './displayValues';
import { chooseIcon } from './weatherIcons';

export async function initializeFormHandler() {
  const form = document.querySelector('form');
  const inputText = document.querySelector('input');
  const loadingSpinner = document.querySelector('#loading-spinner');
  const apiDataContainer = document.querySelector('#api-data');
  const dataContainer = document.querySelector('#data-container');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      dataContainer.style.display = 'flex';
      loadingSpinner.style.display = 'block';
      apiDataContainer.style.opacity = 0;
      const data = await getWeatherData(inputText.value);
      const { currentConditions, dayArray } = extractData(data);
      chooseIcon(currentConditions, dayArray);
      displayValues(currentConditions, dayArray);

      const event = new CustomEvent('weatherDataUpdated', {
        detail: { currentConditions, dayArray },
      });
      document.dispatchEvent(event);
      inputText.value = '';
    } catch (error) {
      console.error('Error during data processing', error);
      apiDataContainer.textContent = 'Error fetching data';
    } finally {
      loadingSpinner.style.display = 'none';
      dataContainer.style.display = 'none';
      apiDataContainer.classList.add('show-api-data');
    }
  });
}
