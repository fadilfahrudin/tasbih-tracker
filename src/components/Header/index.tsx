import { Activity, useEffect, useRef, useState } from 'react';
import { AiFillMoon, AiFillSun } from 'react-icons/ai';
import { BiReset } from 'react-icons/bi';
import { FaPray } from 'react-icons/fa';
import { IoIosInformationCircle } from 'react-icons/io';
import { IoArrowBackOutline, IoArrowUp, IoBookmarksSharp } from 'react-icons/io5';
import { useCounterStore } from '../../hooks/useCounterStore';
import { useScreenStore } from '../../hooks/useScreenStore';
import { useTrackerStore } from '../../hooks/useTrackerStor';
import Modal from '../Modal';
import styles from './header.module.css';

const Header = () => {
    const infoRef = useRef<HTMLDivElement>(null);
    const setScreen = useScreenStore((state) => state.setScreen)
    const screen = useScreenStore((state) => state.screen)
    const { setTracker } = useTrackerStore((state) => state)
    const [isReset, setIsReset] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [dzikirName, setDzikirName] = useState('');
    const { reset, count } = useCounterStore((state) => state)
    const [isDark, setIsDark] = useState(() => {
        return window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches;
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                infoRef.current &&
                !infoRef.current.contains(event.target as Node)
            ) {
                setIsInfoOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle(
            'dark',
            isDark
        );
    }, [isDark]);
    const toggleDarkMode = () => {
        setIsDark(prev => !prev);
    };

    const handleReset = () => {
        reset();
        setIsReset(false);
    }

    const handleSave = () => {
        setTracker({
            counted: count,
            trackerName: dzikirName
        })
        reset();
        setDzikirName('');
        setIsSave(false);
    }


    return (
        <header className={styles.header} >
            <div className={styles.leftMenu}>
                {
                    screen === 'profile' ? (
                        <button type='button' onClick={() => setScreen('main')}><IoArrowBackOutline color='var(--accent-bg)' size={28} /></button>
                    ) : (
                        <>
                            <button type='button' onClick={() => setScreen('profile')} className={styles.tasbih}>
                                <div className={styles.img}>
                                    <img src="/tasbih-128x128.png" alt="dummy person" width={128} height={128} />
                                </div>

                            </button>
                            <button
                                type='button'
                                onClick={() => setIsSave(prev => !prev)}
                            >
                                <IoBookmarksSharp color='var(--surface-bg)' size={30} />
                            </button>
                            <button
                                type="button"
                                className={styles.resetBtn}
                                onClick={() => setIsReset(prev => !prev)}
                            >
                                <BiReset color='var(--surface-bg)' size={32} />
                            </button>
                        </>
                    )
                }
            </div>

            <div className={styles.rightMenu}>
                {
                    screen == 'profile' ? (
                        <h1>Pencapaianmu</h1>
                    ) : (
                        <>
                            <div ref={infoRef} className={styles.info}>
                                <button
                                    type="button"
                                    onClick={() => setIsInfoOpen(prev => !prev)}
                                >
                                    <IoIosInformationCircle color='var(--accent-bg)' size={28} />
                                </button>

                                <Activity mode={isInfoOpen ? 'visible' : 'hidden'}>
                                    <div className={styles.modalInfo}>
                                        <div>Pengguna <span className={styles.infoValue}>1.222.333</span></div>
                                        <div>Made by Fadil <span className={styles.infoValue}>
                                            <a href="#">Buy me a coffee</a>
                                            <IoArrowUp className={styles.ICarrowUp} />
                                        </span>
                                        </div>
                                    </div>
                                </Activity>

                            </div>
                            <button
                                type="button"
                                className={styles.darkModeToggle}
                                onClick={toggleDarkMode}
                            >
                                {
                                    !isDark
                                        ? <AiFillMoon color='var(--primary)' size={28} />
                                        : <AiFillSun color='var(--secondary)' size={28} />
                                }
                            </button>
                        </>
                    )}
            </div>

            <Activity mode={isReset ? 'visible' : 'hidden'}>
                <div id='center' className='modalContainer'>
                    <Modal
                        action={handleReset}
                        actionText='Atur Ulang'
                        cencel={() => setIsReset(false)}
                        title='Kembali ke-0 ?'
                        description='Hitungan saat ini tidak dapat di kembalikan atau tersimpan!'
                    />
                </div>
            </Activity>

            <Activity mode={isSave ? 'visible' : 'hidden'}>
                <div className={styles.saveConfirm}>
                    <div className={styles.saveConfirmContainer}>
                        <div className={styles.saveConfirmInput}>
                            <FaPray color='var(--accent-bg)' size={18} className={styles.saveConfirmIcon} />
                            <input
                                placeholder='Nama dzikir. Cth: Subhanallah'
                                type="text"
                                className={styles.textInput}
                                onChange={(e) => setDzikirName(e.target.value)}
                                name='dzikirName'
                                id='dzikirName'
                                value={dzikirName}
                            />
                        </div>
                        <div className={styles.saveConfirmFooter}>
                            <button type='button' onClick={() => setIsSave(false)}>Batalkan</button>
                            <button type='button' disabled={dzikirName.trim().length < 0} onClick={handleSave}>Simpan</button>
                        </div>
                    </div>
                </div>
            </Activity>
        </header>
    )
}

export default Header