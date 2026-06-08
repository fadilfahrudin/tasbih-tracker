import { Activity, useState } from 'react';
// import { IoMdBookmark } from 'react-icons/io';
import { IoAddOutline, IoClose, IoRemove } from 'react-icons/io5';
import './App.css';
import Header from './components/Header';
import Modal from './components/Modal';
import { usePWAInstall } from './hooks/usePWAInstall';
// import Profile from './components/Profile';
import { useScreenStore } from './hooks/useScreenStore';
import { useCounterStore } from './hooks/useCounterStore';

function App() {
  const [isModalResetVisible, setIsModalResetVisible] = useState(false);
  const [isModalSaveVisible, setIsModalSaveVisible] = useState(false);
  const [isInstallBtnVisible, setIsInstallBtnVisible] = useState(true);
  const [dzikirName, setDzikirName] = useState('');
  const screen = useScreenStore((state) => state.screen)
  const { count, increment, reset, decrement } = useCounterStore((state) => state)

  const {
    isInstallable,
    installApp,
  } = usePWAInstall();

  const handleReset = () => {
    reset();
    setIsModalResetVisible(false);
  }

  const handleSave = () => {
    reset();
    setIsModalSaveVisible(false);
    alert(`Dzikir ${dzikirName} berhasil disimpan!`);
    setDzikirName('');
  }

  return (
    <>
      <Header />

      {/* {
        screen === "profile" && (
          <Profile />
        )
      } */}

      {
        screen === "main" && (
          <>
            <section id="center" className='countSection'>
              <span className='number'>{count}</span>

              {/* <button
                type="button"
                className='saveBtn'
                onClick={() => setIsModalSaveVisible(true)}
              >
                <IoMdBookmark color='var(--accent)' size={32} />
              </button> */}
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

      <Activity mode={isModalResetVisible ? 'visible' : 'hidden'}>
        <div id='center' className='modalContainer'>
          <Modal
            actionText='Atur ulang'
            cencel={() => setIsModalResetVisible(false)}
            title='Mengatur ulang ke 0?'
            description='Hitungan saat ini tidak dapat di kembalikan atau tersimpan!'
            action={handleReset}
          />
        </div>
      </Activity>

      <Activity mode={isModalSaveVisible ? 'visible' : 'hidden'}>
        <div id='center' className='modalContainer'>
          <Modal
            actionText='Simpan'
            cencel={() => setIsModalSaveVisible(false)}
            title='Nama Dzikir.'
            action={handleSave}
            isFormInputField={dzikirName.length > 0}
          >
            <input
              placeholder='Subhanallah..'
              type="text"
              className='textInput'
              onChange={(e) => setDzikirName(e.target.value)}
              name='dzikirName'
              id='dzikirName'
              value={dzikirName}
            />
          </Modal>
        </div>
      </Activity>
    </>
  )
}

export default App
