import {API_URL} from '@env';

export default function putOrderStatus(orderId, orderData) {
  return fetch(`${API_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error('Bad request');
      }
      return res.json();
    })
    .catch((err) => console.log(err));
}
