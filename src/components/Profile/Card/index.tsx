import React from 'react'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5';


interface Props {
    dzikirName: string;
    counter: number;
}

const Card:React.FC<Props> = ({
    dzikirName,
    counter
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.dzikirNameContainer}>
                <img src="/tasbih-128x128.png" alt="tasbih" width={32} height={32} loading="lazy" />
                <div className={styles.dzikirName}>
                    <span>Nama Dzikir</span>
                    <p>{dzikirName}</p>
                </div>
            </div>
            <span className={styles.counter}>{counter} <IoClose/></span>
        </div>
    )
}

export default Card