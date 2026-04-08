import {NavLink} from 'react-router-dom' // es como Link pero detecta si la ruta está activa. además permite aplicar estilos dinámicos como isActive
import styles from './Navbar.module.css'
import logoImg from '../assets/Logo.png'

const Navbar = () => {

    //recuperamos el plan para saber si mostrar el botón de comprar plan
    const userPlan = localStorage.getItem('userPlan') || 'free'
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = '/login' //window.location para recargar aproposito y asegurar limpieza de estados 'carga esta pag como si el user hubiera escrito la url en la barra'
    }

    if (!token) return null

    return (
        <nav className={styles.navbar}>
            <NavLink to='/' className={styles.logoContainer}>
                <img src={logoImg} alt="Logo GainsCloud" className={styles.logoImage} />
            </NavLink>

            {/*inicio*/}
            <NavLink to="/" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                <span className={styles.icon}>🏠</span>
                <span className={styles.label}>Inicio</span>
            </NavLink>

            {/*rutinas*/}
            <NavLink to="/rutinas" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                <span className={styles.icon}>💪</span>
                <span className={styles.label}>Rutinas</span>
            </NavLink>

            {/*carrito simulado*/}
            {userPlan === 'premium' ? (
                <div className={styles.navLink} style={{cursor: 'default'}}>
                    <span className={styles.icon}>⭐</span>
                    <span className={`${styles.label} ${styles.premiumText}`}>Premium</span>
                </div>
            ) : (
                <NavLink to="/pricing" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active} ${styles.upgrade}` : `${styles.navLink} ${styles.upgrade}`}>
                    <span className={styles.icon}>🚀</span>
                    <span className={styles.label}>Premium</span>
                </NavLink>
            )}

            {/*ajustes*/}
            <NavLink to="/perfil/configuracion" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
                <span className={styles.icon}>⚙️</span>
                <span className={styles.label}>Ajustes</span>
            </NavLink>

            {/*salir*/}
            <button onClick={handleLogout} className={styles.logoutBtn}>
                <span className={styles.icon}>🚪</span>
                <span className={styles.label}>Salir</span>
            </button>
        </nav>
    )
}

export default Navbar;