import { useEffect, useState } from 'react';
import { getWorks } from '../firebase/firestoreActions';
import { sendEmail } from '../helpers/sendEmail';

function SendEmail({ id: [ currentId ] }) {
  const [ works, setWorks ] = useState([]);
  const [ selected, setSelected ] = useState('');
  const [ status, setStatus ] = useState({
    status: -1,
    message: '',
  });

  useEffect(() => {
    (async function () {
      setWorks(await getWorks());
    })();
  }, [ currentId ]);

  return (
    <article className='coal text-l 2xl:text-xl'>
      <h3 className='font-bold text-2xl 2xl:text-3xl'>Enviar un correo</h3>
      <span className='font-thin mb-3 mt-3'>Selecciona una obra:</span>

      <ul className='bg-soft-bond mt-3 h-120 overflow-scroll font-light 2xl:h-137 relative'>
        {works.length ? works.map(w => (
          <li
            key={ w.id }
            className={`py-3 px-10 font-light cursor-pointer hover_bg-bound li-animation ${ w.id === selected ? 'bg-bond' : 'bond-border'}`}
            onClick={ () => setSelected(w.id) }
          >{ w.title }</li>
        )) : (
          <li className="text-xl flex justify-center items-center h-full">Vacio</li>
        )}

        <li className={`absolute bottom-0 ${ status.message ? (status.status ? 'bg-error email-animation' : 'bg-success email-animation') : '' } w-full text-center py-2 font-bold`}>{ status.message }</li>
      </ul>

      <button
        className='bg-bond font-bold py-3 px-5 shadow cursor-pointer mx-auto flex mt-3 w-2/8 justify-center 2xl:mt-10'
        onClick={ () => sendEmail({ workId: selected, status: [ setStatus ] }) }
      >Enviar</button>
    </article>
  );
}

export default SendEmail;
