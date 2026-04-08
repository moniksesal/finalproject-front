import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {api} from '../api/auth'
import styles from './Dashboard.module.css'

const Dashboard = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const storedName = localStorage.getItem('userName') || 'Atleta'

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.getDashboardData()
                setData(response)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchDashboard()
    }, [])

    if (loading) return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingText}>Cargando tu progreso...</div>
        </div>
    )

    if (!data) return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.welcomeText}>
                    ¡Hola, <span className={styles.userName}>{storedName}</span>!
                </h1>
                <p className={styles.subHeader}>¿List@ para superar tus marcas hoy?</p>
            </header>
            <div className={styles.errorBox}>
                <p className={styles.errorText}>No pudimos conectar con el servidor para ver tus estadísticas.</p>
                <button onClick={() => window.location.reload()} className={styles.createBtn}>Reintentar</button>
            </div>
        </div>
    )

    const {user_info, summary, coach} = data

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.welcomeText}>
                    ¡Hola, <span className={styles.userName}>{user_info.nombre || storedName}</span>!
                </h1>
                <p className={styles.objective}>
                    ¿List@ para tu objetivo de <span className={styles.objectiveHighlight}>{user_info.objetivo || 'Entrenar'}</span>?
                </p>
            </header>

            <section className={`${styles.coachCard} ${coach.type === 'warning' ? styles.coachWarning : styles.coachNormal}`}>
                <div className={styles.coachHeader}>
                    <span className={styles.coachIcon}>💡</span>
                    <span className={styles.coachLabel}>Mensajes del Coach:</span>
                </div>
                <p className={styles.coachMessage}>
                    "{coach.message}"
                </p>
            </section>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <p className={styles.statLabel}>Tus Rutinas</p>
                    <p className={styles.statValue}>{summary.total_rutinas}</p>
                </div>
                <div className={styles.statCard}>
                    <p className={styles.statLabel}>Objetivo Actual</p>
                    <p className={styles.statValue} style={{fontSize: '20px', textTransform: 'uppercase'}}>{user_info.objetivo || 'Mejorar'}</p>
                </div>
            </div>

            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🚀</div>
                <h2 className={styles.emptyTitle}>Tu Plan {localStorage.getItem('userPlan')?.toUpperCase() || 'FREE'}</h2>
                <p className={styles.emptyText}>Diseña tu semana de entrenamiento configurando tus rutinas personalizadas.</p>
                <button
                    onClick={() => navigate('/rutinas')}
                    className={styles.createBtn}
                >
                    Gestionar Rutinas
                </button>
            </div>
        </div>
    )
}

export default Dashboard