//lo usaré en el futuro cuando la app crezca

import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {api} from '../api/auth'
import styles from './WorkoutSession.module.css'

const WorkoutSession = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [routine, setRoutine] = useState(null)
    const [workoutData, setWorkoutData] = useState([])
    const [feeling, setFeeling] = useState('justo')

    useEffect(() => {
        const loadRoutine = async () => {
            try {
                const data = await api.getRoutineById(id)
                setRoutine(data)
                const initialData = data.exercises.map(ex => ({
                    exercise_id: ex.exercise_id || ex.id,
                    nombre: ex.nombre,
                    series: Array.from({ length: ex.series || 3 }, () => ({
                        repeticiones: ex.repeticiones || 10,
                        peso: 0
                    }))
                }))
                setWorkoutData(initialData)
            } catch (error) {
                console.error(error)
            }
        }
        loadRoutine()
    }, [id])

    const blockInvalidChars = (e) => {
        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
            e.preventDefault()
        }
    }

    const handleSerieChange = (exIndex, serieIndex, field, value) => {
        const newData = [...workoutData]
        //que no sea negativo
        const val = value === '' ? 0 : Math.abs(parseInt(value))
        newData[exIndex].series[serieIndex][field] = val
        setWorkoutData(newData)
    }

    const addSerie = (exIndex) => {
        const newData = [...workoutData]
        const lastSerie = newData[exIndex].series[newData[exIndex].series.length - 1]
        newData[exIndex].series.push({ ...lastSerie })
        setWorkoutData(newData)
    }

    const finishWorkout = async () => {
        const userId = localStorage.getItem('userId')
        try {
            const formattedExercises = workoutData.map(ex => ({
                exercise_id: ex.exercise_id,
                series: ex.series.map((s, idx) => ({
                    serie_num: idx + 1,
                    repeticiones: parseInt(s.repeticiones) || 0,
                    peso: parseInt(s.peso) || 0
                }))
            }))

            const payload = {
                user_id: userId,
                routine_id: id,
                fecha: new Date().toISOString().slice(0, 19).replace('T', ' '),
                feeling: feeling,
                exercises: formattedExercises
            }

            await api.saveWorkout(payload)
            alert("¡Entrenamiento brutal! Guardado con éxito.")
            navigate('/')
        } catch (error) {
            console.error(error)
            alert("Error al guardar el entrenamiento.")
        }
    }

    if (!routine) return <div className={styles.loading}>CARGANDO RUTINA...</div>

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{routine.nombre}</h1>
            </header>

            <div className={styles.exerciseList}>
                {workoutData.map((ex, exIndex) => (
                    <div key={ex.exercise_id || exIndex} className={styles.exerciseCard}>
                        <h3 className={styles.exerciseName}>{ex.nombre}</h3>
                        <div className={styles.tableHeader}>
                            <div className={styles.headerLabel}>Set</div>
                            <div className={styles.headerLabel}>Kg</div>
                            <div className={styles.headerLabel}>Reps</div>
                        </div>

                        <div className={styles.seriesContainer}>
                            {ex.series.map((serie, sIndex) => (
                                <div key={`${ex.exercise_id}-s-${sIndex}`} className={styles.row}>
                                    <div className={styles.setNumber}>{sIndex + 1}</div>
                                    <input
                                        type="number"
                                        min="0"
                                        onKeyDown={blockInvalidChars}
                                        placeholder="0"
                                        className={styles.inputField}
                                        value={serie.peso === 0 ? '' : serie.peso}
                                        onChange={(e) => handleSerieChange(exIndex, sIndex, 'peso', e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        onKeyDown={blockInvalidChars}
                                        placeholder="10"
                                        className={styles.inputField}
                                        value={serie.repeticiones}
                                        onChange={(e) => handleSerieChange(exIndex, sIndex, 'repeticiones', e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={() => addSerie(exIndex)} className={styles.addSerieBtn}>+ Añadir Serie</button>
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.feelingGrid}>
                        {['facil', 'justo', 'dificil'].map(f => (
                            <button 
                                key={f} 
                                onClick={() => setFeeling(f)}
                                className={`${styles.feelingBtn} ${feeling === f ? styles.feelingActive : ''}`}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <button onClick={finishWorkout} className={styles.finishBtn}>Finalizar y Guardar</button>
                </div>
            </div>
        </div>
    )
}

export default WorkoutSession