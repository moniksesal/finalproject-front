import {useState} from 'react'
import {api} from '../api/auth'
import styles from './Pricing.module.css'

const Pricing = () => {
    const [loading, setLoading] = useState(false)

    const handleUpgrade = async (planName) => {
        setLoading(true)
        try {
            await api.upgradePlan('premium')
            localStorage.setItem('userPlan', 'premium')
            alert(`¡Felicidades! Ahora tienes el plan premium. Disfruta de tus ventajas.`)
            window.location.href = '/' //volvemos al dashboard para ver los cambios
        } catch (error) {
            alert("Hubo un problema con la suscripción simulada.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lleva tus gains al siguiente nivel</h1>
            <p className={styles.subtitle}>Elige el plan que mejor se adapte a tus objetivos</p>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h3>1 MES PREMIUM</h3>
                    <p className={styles.price}>9.99€</p>
                    <ul>
                        <li>✅ Rutinas ilimitadas</li>
                        <li>✅ Coach IA avanzado</li>
                        <li>✅ Historial completo</li>
                    </ul>
                    <button
                        disabled={loading}
                        onClick={() => handleUpgrade('Mensual')}
                        className={styles.btn}
                    >
                        {loading ? 'Procesando...' : 'Obtener 1 Mes'}
                    </button>
                </div>

                <div className={`${styles.card} ${styles.featured}`}>
                    <h3>3 MESES PREMIUM</h3>
                    <p className={styles.price}>24.99€</p>
                    <ul>
                        <li>✅ Todo lo del plan mensual</li>
                        <li>✅ Descuento del 20%</li>
                        <li>✅ Soporte individualizado</li>
                    </ul>
                    <button
                        disabled={loading}
                        onClick={() => handleUpgrade('Trimestral')}
                        className={styles.btnFeatured}
                    >
                        {loading ? 'Procesando...' : 'Obtener 3 Meses'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pricing