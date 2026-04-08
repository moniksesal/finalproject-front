import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {api} from '../api/auth'
import styles from './CreateExercise.module.css'

const CreateExercise = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        imagen_url: '',
        video_url: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.createCustomExercise(formData)
            alert("¡Ejercicio personalizado creado!")
            navigate(-1) // Volver a la página anterior
        } catch (error) {
            if (error.response && error.response.status === 403) {
                alert("Función Premium: Solo los usuarios Pro pueden crear sus propios ejercicios. ¡Actualiza tu plan en el perfil!")
            } else {
                alert("No se pudo crear el ejercicio. Inténtalo de nuevo más tarde.")
            }
            console.error(error)
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Nuevo Ejercicio Personalizado</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nombre del ejercicio</label>
                    <input
                        type="text"
                        required
                        className={styles.input}
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Planchas"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Descripción (opcional)</label>
                    <textarea
                        className={styles.textarea}
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        placeholder="Explica la técnica del ejercicio..."
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>URL Imagen</label>
                    <input
                        type="text"
                        placeholder="https://..."
                        className={styles.input}
                        value={formData.imagen_url}
                        onChange={(e) => setFormData({...formData, imagen_url: e.target.value})}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>URL Video (YouTube)</label>
                    <input
                        type="text"
                        placeholder="https://youtube...."
                        className={styles.input}
                        value={formData.video_url}
                        onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={styles.submitBtn}>
                        Guardar Ejercicio
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className={styles.cancelBtn}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateExercise