export default function getTodayOrders() {
  return fetch('http://192.168.1.94:3000/orders/today', {
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
