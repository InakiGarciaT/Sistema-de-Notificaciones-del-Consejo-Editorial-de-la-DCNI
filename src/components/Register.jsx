import { useEffect, useState } from 'react'
import { createWork } from '../helpers/saveInfo';

function Register({ id: [ setCurrentId ] }) {
  const [ work, setWork ] = useState({
    title: '',
  });

  const [ currentWork, setCurrentWork ] = useState({
    title: ''
  });

  const [ error, setError ] = useState(null);

  const cleanWork = e => {
    e.preventDefault();

    setCurrentId(null);
    setCurrentWork({ title: '' });
  }

  useEffect(() => {
    setError(null);
  }, [ work ]);

  return (
    <form>
      <h3 className='font-bold text-2xl 2xl:text-3xl'>Dar de alta una obra</h3>
      <span className='font-thin text-l mb-5 2xl:text-xl'>Llena los datos de la obra</span>

      <div className='flex flex-col mt-3 text-l 2xl:text-xl'>
        <label htmlFor="work">Título:</label>
        <div className='flex justify-between gap-2.5 items-center mt-2'>
          { !currentWork.title ? (
            <input
              type="text"
              placeholder="Título de la obra"
              id="work"
              className={`py-3 px-5 placeholder:font-thin bg-soft-cloud w-6/8 coal-border ${ error ? 'error-animation' : '' }`}
              value={ work.title }
              onChange={ e => setWork({ title: e.target.value }) }
            />
          ) : (
            <p className="text-xl font-light 2xl:text-2xl">{ currentWork.title }</p>
          )}
          <button
            className='bg-cloud font-bold py-3 px-5 shadow cursor-pointer w-2/8'
            onClick={ e => !currentWork.title ?
              createWork(e, [ work, setWork ], [ setCurrentWork ], [ setCurrentId ], [ setError ]) :
              cleanWork(e)
            }
          >{ !currentWork.title ? 'Crear' : 'Nueva' }</button>
        </div>
      </div>
    </form>
  )
}

export default Register;
