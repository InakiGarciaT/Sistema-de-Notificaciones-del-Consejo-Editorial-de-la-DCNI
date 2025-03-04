import { useState } from 'react'

import './App.css'
import './css/Animatios.css';
import Register from './components/Register'
import RegisterAuthor from './components/RegisterAuthor'
import SendEmail from './components/SendEmail'

function App() {
  const [ currentId, setCurrentId ] = useState(null);

  return (
    <div className='bg-zinc-800 h-screen'>
      <h1 className='text-center bond font-bold py-2 text-2xl'>Sistema de Notificaciones del Consejo Editorial de la DCNI</h1>

      <div className='flex mx-auto content-center justify-center relative'>
        <section className='bg-blue mw-600 px-5 py-8 hard-coal'>
          <Register
            id={[ setCurrentId ]}
          />
          <svg className={`absolute w-140 mx-auto ${ currentId ? 'border-animation' : '' }`} height="40" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0,5 L47,5 L50,8 L53,5 L100,5" stroke="rgba(234, 236, 239, 0.8)" fill="none"/>
          </svg>
          <RegisterAuthor
            id={[ currentId, setCurrentId ]}
          />
        </section>

        <section className='bg-grey mw-600 px-5 py-8 coal'>
          <SendEmail
            id={[ currentId ]}
          />
        </section>
      </div>
    </div>
  )
}

export default App
