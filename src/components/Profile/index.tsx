import styles from './profile.module.css'

const Profile = () => {
    return (
        <>
        <section id='center'>
            <div className={styles.profile}>
                <div className={styles.img}>
                    <img src="/person.jpg" alt="person" width={150} height={150} loading='lazy'/>
                </div>
                <p>fadilfahrudin32@gmail.com</p>
            </div>
        </section>
        <section id='center'>
            <div className={styles.dzikirJournal}>

            </div>
        </section>
        </>
    )
}

export default Profile