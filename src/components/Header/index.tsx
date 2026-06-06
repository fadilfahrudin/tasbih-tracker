import { Activity, useEffect, useState } from 'react';
import { AiFillMoon, AiFillSun } from 'react-icons/ai';
import { IoIosInformationCircle } from 'react-icons/io';
import { IoArrowUp, IoSaveSharp } from 'react-icons/io5';
import styles from './header.module.css';

const Header = () => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);
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
        <header className={styles.header}>
            <div className={styles.leftMenu}>
                <div className={styles.profile}>
                    <div className={styles.img}></div>
                    <Activity mode={'visible'}>
                        <div className={styles.detail}>
                            <div>fadilfahrudin</div>
                            <div>
                                <button>Info Dzikir saya</button>
                            </div>
                            <div>
                                <button>Sign Out</button>
                            </div>
                        </div>
                    </Activity>
                </div>
                <button type='button' onClick={() => { }}><IoSaveSharp color='var(--accent-bg)' size={28} /></button>
            </div>
            <div className={styles.rightMenu}>
                <div className={styles.info}>
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
            </div>
        </header>
    )
}

export default Header