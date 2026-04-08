import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {api} from '../api/auth'
import styles from './CreateRoutine.module.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CreateRoutine = () => {
    const { day } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [availableExercises, setAvailableExercises] = useState([])
    const [selectedExercises, setSelectedExercises] = useState([])
    const [userPlan, setUserPlan] = useState('free')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exercisesData = await api.getExercises()
                setAvailableExercises(exercisesData)
                const profile = await api.getProfile()
                setUserPlan(profile.plan)
            } catch (error) {
                console.error("Error cargando datos iniciales:", error)
            }
        }
        fetchData()
    }, [])

    const handleAddExercise = () => {
        setSelectedExercises([
            ...selectedExercises, 
            { 
                tempId: crypto.randomUUID(), 
                exercise_id: '', 
                series: '', 
                repetitions: '', 
                rest: '' 
            }
        ])
    }
    
    //bloquear teclas indeseadas aunque pongamos input type number para no generar errores en la base de datos
    const blockInvalidChars = (e) => {
        if (['e', 'E', '+', '-', '.'].includes(e.key)) {
            e.preventDefault()
        }
    }

    const updateExerciseField = (index, field, value) => {
        const updatedExercises = [...selectedExercises]
        // Solo números positivos o string vacío
        const val = value === '' ? '' : Math.abs(parseInt(value))
        updatedExercises[index][field] = val
        setSelectedExercises(updatedExercises)
    }

    const handleSaveRoutine = async (e) => {
        e.preventDefault()
        const exercisesToSend = selectedExercises.filter(ex => ex.exercise_id !== '')

        if (exercisesToSend.length === 0) {
            alert("Por favor, selecciona al menos un ejercicio.")
            return
        }

        try {
            const res = await api.createRoutine({
                nombre: name,
                dias: [day]
            })

            if (res.routineId) {
                const payload = {
                    routine_id: res.routineId,
                    exercises: exercisesToSend.map(ex => ({
                        exercise_id: parseInt(ex.exercise_id),
                        series: parseInt(ex.series) || 0,
                        repeticiones: parseInt(ex.repetitions) || 0,
                        descanso: parseInt(ex.rest) || 0
                    }))
                }

                const resEx = await fetch(`${API_URL}/routines/exercises`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(payload)
                })

                if (resEx.ok) {
                    alert("Rutina creada con éxito")
                    navigate('/rutinas')
                } else {
                    const errorData = await resEx.json()
                    throw new Error(errorData.message || "Error al vincular ejercicios")
                }
            }
        } catch (error) {
            console.error(error)
            alert(error.message || "Error guardando rutina")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Nueva rutina: {day}</h1>

            <form onSubmit={handleSaveRoutine}>
                <input
                    type="text"
                    placeholder="Nombre de la rutina"
                    className={styles.inputName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <div className={styles.exerciseList}>
                    {selectedExercises.map((item, index) => {
                        const exerciseInfo = availableExercises.find(ex => ex.id == item.exercise_id)
                        return (
                            <div key={item.tempId} className={styles.exerciseCard}>
                                <select
                                    className={styles.selectMain}
                                    value={item.exercise_id}
                                    onChange={(e) => updateExerciseField(index, 'exercise_id', e.target.value)}
                                    required
                                >
                                    <option value="">Selecciona ejercicio...</option>
                                    {availableExercises.map(ex => (
                                        <option key={ex.id} value={ex.id}>{ex.nombre}</option>
                                    ))}
                                </select>

                                <div className={styles.gridInputs}>
                                    {['series', 'repetitions', 'rest'].map((field) => (
                                        <div key={field} className={styles.inputWrapper}>
                                            <span className={styles.inputLabel}>
                                                {field === 'series' ? 'S:' : field === 'repetitions' ? 'R:' : 'D:'}
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                onKeyDown={blockInvalidChars}
                                                placeholder="0"
                                                className={styles.smallInput}
                                                value={item[field]}
                                                onChange={(e) => updateExerciseField(index, field, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button type="button" onClick={handleAddExercise} className={styles.addBtn}>
                    AÑADIR EJERCICIO
                </button>

                {userPlan === 'premium' ? (
                    <div className={styles.premiumBox}>
                        <button type="button" onClick={() => navigate('/ejercicios/nuevo')} className={styles.createExBtn}>
                            CREAR NUEVO EJERCICIO
                        </button>
                    </div>
                ) : (
                    <div className={styles.freeBox}>
                        <p className={styles.freeText}>Pásate a PREMIUM</p>
                    </div>
                )}

                <button type="submit" className={styles.saveBtn}>Guardar entrenamiento</button>
                <button type="button" onClick={() => navigate('/rutinas')} className={styles.cancelBtn}>✕ Cancelar</button>
            </form>
        </div>
    )
}

export default CreateRoutine