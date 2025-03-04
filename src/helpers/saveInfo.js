import { addToFirestore, updateWork } from "../firebase/firestoreActions";

export async function createWork(
  e,
  [ work, setWork ],
  [ setCurrentWork ],
  [ setCurrentId ],
  [ setError ],
) {
  e.preventDefault();

  if ( !work.title ) {
    setError('El campos Título no puede ir vacío');

    return;
  }

  try {
    const id = await addToFirestore({ work });

    setCurrentId(id);
    setCurrentWork({ title: work.title });
    setWork({
      title: '',
    });
  } catch {
    setError('Error al intentar crear una obra');
  }
}

export async function createAuthor(
  e,
  [ author, setAuthor ],
  [ authors, setAuthors ],
  [ currentId ],
  [ setError ],
) {
  e.preventDefault();

  if ( !author.name || !author.email ) {
    setError(`${ !author.name ? 'Nombre' : 'Email'  }`);

    return;
  }

  if ( !currentId ) {
    setError('No hay una obra a la que agregar autores');

    return;
  }

  try {
    const newData = {
      authors: [ ...authors, author ],
    }

    updateWork({ id: currentId, data: { authors: newData.authors } });

    setAuthors([
      ...authors,
      author,
    ]);

    setAuthor({
      name: '',
      email: '',
    });
  } catch {
    setError('Error al intentar crear un autor');
  }
}
