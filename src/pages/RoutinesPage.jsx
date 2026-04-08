import {useEffect, useState} from 'react'
import {api} from '../api/auth'
import {Link, useNavigate} from 'react-router-dom'
import styles from './RoutinesPage.module.css'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const DIAS_SEMANA = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

const RoutinesPage = () => {
    const [routines, setRoutines] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadRoutines()
    }, [])

    const loadRoutines = async () => {
        try {
            setLoading(true)
            const data = await api.getRoutines()
            if (Array.isArray(data)) {
                setRoutines(data)
            } else {
                setError(data.message || "Error al cargar rutinas")
            }
        } catch (err) {
            setError("No se pudo conectar con el servidor")
        } finally {
            setLoading(false)
        }
    }

    const eliminarRutina = async (e, id) => {
        e.preventDefault()
        if (!window.confirm("¿Estás seguro de que quieres eliminar esta rutina?")) return
        try {
            const res = await fetch(`${API_URL}/routines/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }
            })
            if (res.ok) {
                setRoutines(routines.filter(r => r.id !== id))
            } else {
                alert("No se pudo eliminar.")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const normalizar = (texto) => {
        let minusculas = texto.toLowerCase()
        let descompuesto = minusculas.normalize('NFD')
        let limpio = descompuesto.replace(/[\u0300-\u036f]/g, "")
        return limpio
    }

    if (loading) return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
            <p>Organizando tu semana...</p>
        </div>
    )

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Mi Calendario</h1>
                    <p className={styles.subtitle}>Gestiona tus entrenamientos semanales</p>
                </div>
                <div className={styles.badge}>
                    {routines.length} {routines.length === 1 ? 'Rutina' : 'Rutinas'}
                </div>
            </header>

            {error && (
                <div className={styles.errorCard}>
                    <p>{error}</p>
                    <button onClick={loadRoutines}>Reintentar</button>
                </div>
            )}

            <div className={styles.calendar}>
                {DIAS_SEMANA.map((dia) => {
                    const rutinasDelDia = routines.filter(r => {
                        if (!r.dias || !Array.isArray(r.dias)) return false
                        return r.dias.some(d => normalizar(d) === dia)
                    })

                    return (
                        <div key={dia} className={styles.dayRow}>
                            <div className={styles.daySidebar}>
                                <h2 className={styles.dayName}>{dia}</h2>
                                <div className={styles.dot}></div>
                            </div>

                            <div className={styles.dayContent}>
                                <div className={styles.routinesContainer}>
                                    {rutinasDelDia.length > 0 ? (
                                        rutinasDelDia.map(rutina => (
                                            <div key={rutina.id} className={styles.routineCard}>
                                                {/* Se cambia /entrenar/ por /rutinas/ para ver el detalle y no la pantalla desactivada */}
                                                <Link to={`/rutinas/${rutina.id}`} className={styles.routineInfo}>
                                                    <span className={styles.routineIcon}>🏋️‍♂️</span>
                                                    <span className={styles.routineName}>{rutina.nombre}</span>
                                                </Link>
                                                <button 
                                                    onClick={(e) => eliminarRutina(e, rutina.id)}
                                                    className={styles.deleteBtn}
                                                    title="Eliminar rutina"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className={styles.emptyText}>No hay ninguna rutina</p>
                                    )}
                                </div>

                                <button onClick={() => navigate(`/rutinas/crear/${dia}`)} className={styles.addBtn}>+</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RoutinesPage