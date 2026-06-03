import { useState } from 'react'
import './App.css'
import { IoAddOutline } from 'react-icons/io5'
import { usePWAInstall } from './hooks/usePWAInstall';

function App() {
  const [count, setCount] = useState(0)
  const {
    isInstallable,
    installApp,
  } = usePWAInstall();

  return (
    <>
      {
        isInstallable && (
          <div className='floatingContainer'>
            <button className='floatingBtn' type='button' onClick={installApp}>Install App</button>
          </div>
        )
      }
      <section id="center">
        <h1>Vite + React</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid totam laborum labore aut obcaecati numquam cum quasi eligendi incidunt corporis.</p>
      </section>
      <section id="center">
        <span className='number'>{count}</span>
      </section>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          <IoAddOutline color='var(--accent)' size={52} />
        </button>
      </section>
    </>
  )
}

export default App
