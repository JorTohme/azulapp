import {API_URL} from '@env';

export default function getTodayOrders() {
  return fetch(`${API_URL}/orders/today`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
}
