import {API_URL} from '@env';

export default function getMenu() {
  return fetch(`${API_URL}/menu/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error('Bad request');
      }
      return res.json();
    })
    .catch((err) => console.log(err));
}
