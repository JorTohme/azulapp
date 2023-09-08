export default function putTableFree(tableID) {
  return fetch(`http://192.168.1.94:3000/tables/free/${tableID}`, {
    method: 'PUT',
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