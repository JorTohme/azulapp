import {API_URL} from '@env';
import {SECRET} from '@env';

export default function getSpaces() {
  return fetch(`${API_URL}/spaces/tables`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      origin: SECRET,
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
