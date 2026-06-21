import { Activity, useState } from 'react';
import { IoAddOutline, IoClose, IoRemove } from 'react-icons/io5';
import './App.css';
import Header from './components/Header';
import { usePWAInstall } from './hooks/usePWAInstall';
import Profile from './components/Profile';
import { useCounterStore } from './hooks/useCounterStore';
import { useScreenStore } from './hooks/useScreenStore';

function App() {
  const [isInstallBtnVisible, setIsInstallBtnVisible] = useState(true);
  const screen = useScreenStore((state) => state.screen)
  const { count, increment, decrement } = useCounterStore((state) => state)

  const {
    isInstallable,
    installApp,
  } = usePWAInstall();

  return (
    <>
      <Header />

      {
        screen === "profile" && (
          <Profile />
        )
      }

      {
        screen === "main" && (
          <>
            <section id="center" className='countSection'>
              <span className='number'>{count}</span>
            </section>

            <section id="center" className='counterSection'>
              <button
                type="button"
                className="counter"
                onClick={increment}
              >
                <IoAddOutline color='var(--surface-container)' size={52} />
              </button>
              <button
                type="button"
                className="decrement"
                onClick={decrement}
              >
                <IoRemove  color='var(--surface-bg)' size={32} />
              </button>
            </section>
          </>
        )
      }

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
