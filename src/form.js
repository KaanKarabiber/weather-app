import { extractData } from '.';

export async function initializeFormHandler() {
  const form = document.querySelector('form');
  const inputText = document.querySelector('input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    (async () => {
      try {
        const { currentConditions, dayArray } = await extractData(
          inputText.value
        );
        console.log(currentConditions, dayArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  });
}
