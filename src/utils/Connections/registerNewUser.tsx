export default function registerNewUser(
  email: string,
  password: string,
  fullname: string,
  setError: any,
  navigation: any,
) {
  return fetch('http://192.168.1.94:3000/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({email, password, fullname}),
  })
    .then((res) => {
      if (res.status === 400) {
        setError('Error al registrarse');
        throw new Error('Bad request');
      } else if (res.status === 409) {
        setError('El email ya está registrado');
        throw new Error('User already exists');
      } else {
        res.json().then((data) => {
          if (data.success) {
            navigation.navigate('Main');
          } else {
            setError('Error al registrarse');
            throw new Error('Bad request');
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
