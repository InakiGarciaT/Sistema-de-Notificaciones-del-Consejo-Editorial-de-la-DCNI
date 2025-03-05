# Sistema de Notificaciones del Consejo Editorial de la DCNI

Esta aplicación permite la gestión de obras y autores, además de enviar correos electrónicos a los autores de una obra seleccionada.

## Demo
Puedes acceder a una demo de la aplicación en el siguiente enlace:
[https://67c79d0b3ddd044649526026--musical-figolla-a7db37.netlify.app](https://67c79d0b3ddd044649526026--musical-figolla-a7db37.netlify.app)

## Instalación y Uso

### Ejecución Normal
1. Clona el repositorio:
   ```sh
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación:
   ```sh
   npm start
   ```

### Uso con Docker
Si tienes problemas de compatibilidad, puedes ejecutar la app con Docker:

1. Construye la imagen:
   ```sh
   docker build -t dcni .
   ```
2. Corre el contenedor:
   ```sh
   docker run -p 3000:80 dcni
   ```

## Funcionamiento de la App

1. **Registrar una obra**: Se debe crear una obra en la aplicación.
2. **Agregar autores**: Cada obra debe tener al menos un autor.
3. **Enviar correos**: Se puede seleccionar una obra y enviar correos a los autores de la misma.

## Uso de `@emailjs/browser`
La aplicación utiliza la biblioteca `@emailjs/browser` para el envío de correos electrónicos. Se inicializa con una clave pública y se usa `send` para enviar correos a los autores de una obra.

### Ejemplo de implementación:
```javascript
import emailjs from '@emailjs/browser';
import { getWork } from '../firebase/firestoreActions';

emailjs.init({
  publicKey: 'CfEXT2j4BoF7xpGA-'
});

export async function sendEmail({ workId, status: [ setStatus ] }) {
  const serviceId = 'service_lrgq8kd';
  const templateId = 'template_5cuf4sb';

  try {
    const work = await getWork({ id: workId });

    await Promise.all(
      work.authors.map(a => {
        const templateParams = {
          message: 'Hola autor',
          work_title: work.title,
          to_email: a.email,
        };

        return emailjs.send(serviceId, templateId, templateParams);
      })
    );

    setStatus({
      status: 0,
      message: 'Correos enviados correctamente',
    });
  } catch {
    setStatus({
      status: 1,
      message: 'Error al enviar los correos',
    });
  }

  setTimeout(() => {
    setStatus({
      status: 0,
      message: '',
    });
  }, 9000);
}
```

De esta manera, la aplicación gestiona la comunicación con los autores de las obras mediante correo electrónico.

