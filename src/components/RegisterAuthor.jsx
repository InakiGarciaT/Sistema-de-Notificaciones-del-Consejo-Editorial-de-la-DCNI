import { useEffect, useState } from "react";
import { createAuthor } from "../helpers/saveInfo";

function RegisterAuthor({id: [ currentId, setCurrentId ]}) {
  const [ author, setAuthor ] = useState({
    name: '',
    email: '',
  });

  const [ authors, setAuthors ] = useState([]);

  const [ error, setError ] = useState(null);

  useEffect(() => {
    setError(null);
  }, [ authors ]);

  useEffect(() => {
    setAuthors([]);
  }, [ currentId ]);

  return currentId ? (
    <article className="form-animation">
      <h3 className='font-bold text-2xl mt-5 2xl:text-3xl'>Agregar un autor a la obra</h3>
      <span className='font-thin text-l mb-3 mt-3 2xl:text-xl'>Llena los datos del autor</span>

      <form className="text-l 2xl:text-xl">
        <div className="flex flex-col">
          <label className="mt-3" htmlFor="name">Nombre:</label>
          <input
            type="text"
            placeholder="Nombre del autor"
            className={`py-3 px-5 placeholder:font-thin bg-soft-cloud coal-border mt-3 mb-3 ${ error === 'Nombre' ? 'error-animation' : '' }`}
            value={ author.name }
            onChange={ e => setAuthor({ ...author, name: e.target.value }) }
            />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Email:</label>
          <input
            type="text"
            placeholder="Email del autor"
            className={`py-3 px-5 placeholder:font-thin bg-soft-cloud coal-border mt-2 ${ error === 'Email' ? 'error-animation' : '' }`}
            value={ author.email }
            onChange={ e => setAuthor({ ...author, email: e.target.value }) }
          />
        </div>

        <h4 className="font-bold mt-3 mb-2">Autores añadidos a la obra:</h4>
        <ul className="bg-soft-cloud w-full h-22 overflow-scroll font-thin 2xl:h-30">
        { authors.length ? authors.map(a => (
          <li className="border-cloud text-l capitalize cloud-border py-3 px-10 2xl:text-xl li-animation" key={ a.email }>{ a.name }</li>
        )) : (
          <li className="text-xl flex justify-center items-center h-full">Vacio</li>
        )
        }
        </ul>

        <button
          type="submit"
          className="bg-cloud font-bold py-3 px-5 shadow cursor-pointer mx-auto flex mt-3 w-2/8 justify-center 2xl:mt-10"
          onClick={ e =>
            createAuthor(e, [ author, setAuthor ], [ authors, setAuthors ], [ currentId, setCurrentId ], [ setError ])
          }
        >Agregar</button>
      </form>
  </article>
  ) : null;
}

export default RegisterAuthor;
