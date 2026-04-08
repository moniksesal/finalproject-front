import {useState} from 'react'
import {api} from '../api/auth'
import styles from './Login.module.css'

const Login = () => {
    const [isRegister, setIsRegister] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        edad: 18,
        objective_id: 1,
        plan: 'free'
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isRegister && formData.password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres')
            return
        }

        try {
            const data = isRegister
                ? await api.register(formData)
                : await api.login({email: formData.email, password: formData.password})

            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.user.id)
            localStorage.setItem('userName', data.user.nombre)

            alert(`¡Bienvenid@, ${data.user.nombre}!`)

            window.location.href = '/'

        } catch (err) {
            console.error("Error en la autenticación:", err.message)
            alert(err.message || "Error al conectar con el servidor")
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>{isRegister ? 'Únete al Club' : 'Bienvenido'}</h1>
                <p className={styles.subtitle}>
                    {isRegister ? 'Crea tu perfil de entrenamiento' : 'Introduce tus credenciales'}
                </p>

                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nombre completo</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Tu nombre"
                                required
                                value={formData.nombre}
                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            />
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="correo@ejemplo.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Contraseña</label>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {isRegister ? 'Crear Cuenta' : 'Entrar'}
                    </button>
                </form>

                <p className={styles.switch}>
                    {isRegister ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'} {' '}
                    <span className={styles.link} onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Inicia Sesión' : 'Regístrate aquí'}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login