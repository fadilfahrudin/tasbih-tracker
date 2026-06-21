import React from 'react'
import styles from './modal.module.css'
import { IoClose } from 'react-icons/io5'

interface Props {
    title: string
    description?: string
    action: () => void
    cencel: () => void
    actionText: string
    children?: React.ReactNode
    isFormInputField?: boolean
}
const Modal: React.FC<Props> = ({
    title,
    description,
    action,
    cencel,
    actionText,
    children,
    isFormInputField
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h1>{title}</h1>
                    <button type='button' onClick={cencel}><IoClose color='var(--accent-bg)' size={24} /></button>
                </div>
                <div className={styles.body}>
                    {children}
                    {
                        description && (
                            <p>{description}</p>
                        )
                    }
                </div>
                <div className={styles.footer}>
                    <button type='button' className={styles.btnFooter} onClick={cencel}>Batalkan</button>
                    <button type='button' className={styles.btnFooter} disabled={isFormInputField} onClick={action}>{actionText}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;