import { useState } from 'react'
import './App.css'
import { IoAddOutline, IoReloadSharp } from 'react-icons/io5'
import { usePWAInstall } from './hooks/usePWAInstall';
import { IoIosInformationCircle, IoMdBookmark } from 'react-icons/io';
import { AiFillMoon } from 'react-icons/ai';

function App() {
  const [count, setCount] = useState(0)
  const {
    isInstallable,
    installApp,
  } = usePWAInstall();

  return (
    <>
      <header id="header">
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          <IoIosInformationCircle  color='var(--accent-bg)' size={28} />
        </button>
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          <AiFillMoon  color='var(--secondary)' size={28} />
        </button>
      </header>

      <section id="center">
        <img src="/bismillah.png" alt="bismillah hirrahmanirrahim" width={310} height={115} className='bismillah' loading='eager' />
        <p>“Dengan nama Allah yang maha pengasih lagi maha penyayang.”</p>
      </section>

      <section id="center" className='countSection'>
        <button
          type="button"
          className='resetBtn'
          onClick={() => setCount((count) => count + 1)}
        >
          <IoReloadSharp color='var(--accent)' size={32} />
        </button>

        <span className='number'>{count}</span>

        <button
          type="button"
          className='saveBtn'
          onClick={() => setCount((count) => count + 1)}
        >
          <IoMdBookmark color='var(--accent)' size={32} />
        </button>
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

      {
        isInstallable && (
          <div className='floatingContainer'>
            <button className='floatingBtn' type='button' onClick={installApp}>Install App</button>
          </div>
        )
      }
    </>
  )
}

export default App
