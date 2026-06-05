import { Activity, useEffect, useState } from 'react';
import { AiFillMoon, AiFillSun } from 'react-icons/ai';
import { IoIosInformationCircle, IoMdBookmark } from 'react-icons/io';
import { IoAddOutline, IoClose, IoReloadSharp } from 'react-icons/io5';
import './App.css';
import { usePWAInstall } from './hooks/usePWAInstall';

function App() {
  const [count, setCount] = useState(0)
  const [isInstallBtnVisible, setIsInstallBtnVisible] = useState(true);

  const {
    isInstallable,
    installApp,
  } = usePWAInstall();
  

  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  });


  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      isDark
    );
  }, [isDark]);
  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  return (
    <>
      <header id="header">
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          <IoIosInformationCircle color='var(--accent-bg)' size={28} />
        </button>
        <button
          type="button"
          className='darkModeToggle'
          onClick={toggleDarkMode}
        >
          {
            !isDark
              ? <AiFillMoon color='var(--primary)' size={28} />
              : <AiFillSun color='var(--secondary)' size={28} />
          }
        </button>
      </header>

      <section id="center" className='wording'>
        <h1>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h1>
        <p>“Dengan nama Allah yang maha pengasih lagi maha penyayang.”</p>
      </section>

      <section id="center" className='countSection'>
        <button
          type="button"
          className='resetBtn'
          onClick={() => setCount(0)}
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
          <IoAddOutline color='var(--surface-container)' size={52} />
        </button>
      </section>

      <Activity mode={isInstallBtnVisible && isInstallable ? 'visible' : 'hidden'}>
        <div className='floatingContainer'>
            <button className='floatingBtnClose' type='button' onClick={() => setIsInstallBtnVisible(false)}><IoClose color='var(--surface-btn)' size={22} /></button>
            <button className='floatingBtn' type='button' onClick={installApp}>Install App</button>
          </div>
      </Activity>
    </>
  )
}

export default App
