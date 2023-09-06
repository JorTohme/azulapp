export default function getMenu() {
  return fetch('http://192.168.1.94:3000/menu/items', {
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