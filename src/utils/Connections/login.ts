export default function login(email: string, password: string) {
  return fetch('http://192.168.1.94:3000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      from: 'app',
    },
    body: JSON.stringify({email, password}),
  })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Unauthorized');
      }

      return res.json();
    })
    .catch((err) => console.log(err));
}
