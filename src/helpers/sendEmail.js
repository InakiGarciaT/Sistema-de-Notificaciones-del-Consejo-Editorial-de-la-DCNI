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
