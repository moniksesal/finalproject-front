import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {api} from '../api/auth'
import styles from './RoutineDetail.module.css'

const RoutineDetail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [routine, setRoutine] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await api.getRoutineById(id)
                setRoutine(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchDetail()
    }, [id])

    if (loading) return <div className={styles.loading}>Cargando entrenamiento...</div>
    if (!routine) return <div className={styles.notFound}>No se encontró la rutina.</div>

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => navigate(-1)} className={styles.backBtn}>
                    ← Volver
                </button>
                <h1 className={styles.routineTitle}>{routine.nombre}</h1>
                <p className={styles.subtitle}>{routine.exercises?.length || 0} ejercicios listos</p>
            </div>

            <div className={styles.exerciseGrid}>
                {routine.exercises && routine.exercises.length > 0 ? (
                    routine.exercises.map((ex) => (
                        <div key={ex.id} className={styles.exerciseCard}>
                            <div className={styles.cardFlex}>
                                <div className={styles.imageContainer}>
                                    {ex.imagen_url ? (
                                        <img src={ex.imagen_url} alt={ex.nombre} className={styles.exerciseImage} />
                                    ) : (
                                        <div className={styles.noImage}>💪</div>
                                    )}
                                </div>

                                <div className={styles.infoContent}>
                                    <div className={styles.infoHead}>
                                        <h3 className={styles.exerciseName}>{ex.nombre}</h3>
                                        {ex.video_url && (
                                            <a href={ex.video_url} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>
                                                🎥 Video
                                            </a>
                                        )}
                                    </div>

                                    <p className={styles.description}>
                                        {ex.descripcion || "Enfócate en la técnica y controla el movimiento."}
                                    </p>

                                    <div className={styles.statsRow}>
                                        <div className={styles.statBox}>
                                            <span className={styles.statValue}>{ex.series}</span>
                                            <span className={styles.statLabel}>Series</span>
                                        </div>
                                        <div className={styles.statBox}>
                                            <span className={styles.statValue}>{ex.repeticiones}</span>
                                            <span className={styles.statLabel}>Reps</span>
                                        </div>
                                        <div className={styles.statBox}>
                                            <span className={styles.statValue}>{ex.descanso}s</span>
                                            <span className={styles.statLabel}>Descanso</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState}>
                        <p>No hay ejercicios añadidos todavía.</p>
                    </div>
                )}
            </div>

            <div className={styles.floatingAction}>
                <button
                    onClick={() => navigate(`/entrenar/${id}`)}
                    className={styles.startBtn}
                >
                    <span className={styles.btnIcon}>🚀</span> EMPEZAR ENTRENAMIENTO
                </button>
            </div>
        </div>
    )
}

export default RoutineDetail

//noopener -- evita que la pag abierta pueda acceder a tu pag a traves de widow.opener
//noreferrer -- no envia la informacion del referer (la url de mi pag) a la pagina que abres. (seguridad y privacidad)