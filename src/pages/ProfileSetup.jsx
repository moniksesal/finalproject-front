import {useState} from 'react';
import {api} from '../api/auth';
import styles from './ProfileSetup.module.css';

const ProfileSetup = () => {
    const [formData, setFormData] = useState({
        objective_id: 1,
        fuma: false,
        alcohol: false,
        horas_sueno: 7,
        nivel_agua: 'media',
        plan: 'premium'
    })

    const saveProfile = async () => {
        try {
            await api.updateObjective(formData.objective_id)
            await api.saveHabits({
                sueno: formData.horas_sueno,
                agua: formData.nivel_agua,
                tabaco: formData.fuma ? 1 : 0,
                alcohol: formData.alcohol ? 1 : 0
            })
            alert("¡Perfil y hábitos configurados!")
        } catch (error) {
            console.log(error)
            alert("Error al guardar el perfil")
        }
    }

    const handleDowngrade = async () => {
        if (!window.confirm("¿Seguro que quieres volver al plan Free? Se limitará tu creación de rutinas.")) {
            return;
        }
        try {
            await api.updatePlan('free')
            alert("Ahora eres usuario Free")
            window.location.reload()
        } catch (error) {
            console.log(error)
            alert("Error al cambiar de plan")
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Configura tu Estilo de Vida</h2>
            
            <div className={styles.formContent}>
                {/* obj */}
                <section>
                    <label className={styles.label}>¿Cuál es tu meta principal?</label>
                    <select 
                        className={styles.select}
                        value={formData.objective_id}
                        onChange={(e) => setFormData({...formData, objective_id: e.target.value})}>
                        <option value="1">Ganar Masa Muscular</option>
                        <option value="2">Perder Grasa / Definir</option>
                        <option value="3">Mantener Forma Física</option>
                    </select>
                </section>

                {/* habits con toggle*/}
                <div className={styles.toggleGrid}>
                    <button 
                        onClick={() => setFormData({...formData, fuma: !formData.fuma})}
                        className={`${styles.toggleBtn} ${formData.fuma ? styles.fumaActive : ''}`}
                    >
                        🚬 {formData.fuma ? 'Fumador' : 'No fumo'}
                    </button>
                    <button 
                        onClick={() => setFormData({...formData, alcohol: !formData.alcohol})}
                        className={`${styles.toggleBtn} ${formData.alcohol ? styles.alcoholActive : ''}`}
                    >
                        🍷 {formData.alcohol ? 'Bebo alcohol' : 'No bebo'}
                    </button>
                </div>

                {/*sueño con deslizador */}
                <section>
                    <label className={styles.sliderLabel}>
                        Horas de sueño: <span className={styles.highlight}>{formData.horas_sueno}h</span>
                    </label>
                    <input 
                        type="range" min="1" max="15" step="1"
                        className={styles.rangeInput}
                        value={formData.horas_sueno}
                        onChange={(e) => setFormData({...formData, horas_sueno: e.target.value})} />
                </section>

                {/*Agua */}
                <section>
                    <label className={styles.label}>Hidratación Diaria</label>
                    <div className={styles.waterGrid}>
                        {['baja', 'media', 'alta'].map(nivel => (
                            <button 
                                key={nivel}
                                onClick={() => setFormData({...formData, nivel_agua: nivel})}
                                className={`${styles.waterBtn} ${formData.nivel_agua === nivel ? styles.waterActive : ''}`}
                            >
                                {nivel}
                            </button>
                        ))}
                    </div>
                </section>
                
                <button onClick={saveProfile} className={styles.saveBtn}>Guardar Perfil y Empezar</button>

                {/*Botón de gestión de suscripción*/}
                <div className={styles.subscriptionSection} style={{marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #eee'}}>
                    <p className={styles.label}>Gestión de suscripción</p>
                    <button 
                        onClick={handleDowngrade} 
                        className={styles.toggleBtn}
                        style={{width: '100%', fontSize: '0.8rem', opacity: 0.7}}
                    >
                        Volver al plan gratuito
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProfileSetup;