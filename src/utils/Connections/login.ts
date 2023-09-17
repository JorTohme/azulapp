import {API_URL} from '@env';

export default function login(email: string, password: string) {
  return fetch(`${API_URL}/user/login`, {
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
