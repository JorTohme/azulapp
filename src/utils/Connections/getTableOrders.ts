import {API_URL} from '@env';

export default function getTableOrders(tableID) {
  return fetch(`${API_URL}/tables/orders/${tableID}`, {
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
