const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export const api = {
    //autenticación (nuevo)
    register: async (userData) => {
        const res = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        })
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message || "Error en el registro")
        }
        return res.json()
    },

    login: async (credentials) => {
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.message || "Error en el login")
        }
        return res.json()
    },

    //rutinas
    getRoutines: async () => {
        const res = await fetch(`${API_URL}/routines`, {headers: getAuthHeaders()})
        return res.json()
    },
    getRoutineById: async (id) => {
        const res = await fetch(`${API_URL}/routines/${id}`, {headers: getAuthHeaders()})
        return res.json()
    },
    createRoutine: async (data) => {
        const res = await fetch(`${API_URL}/routines`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        })
        return res.json()
    },

    //workouts
    saveWorkout: async (workoutData) => {
        const res = await fetch(`${API_URL}/workouts`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(workoutData)
        })
        if (!res.ok) throw new Error("Error al guardar entrenamiento")
        return res.json()
    },

    //ejs
    getExercises: async () => {
        const res = await fetch(`${API_URL}/exercises`, {headers: getAuthHeaders() })
        return res.json();
    },
    createCustomExercise: async (exerciseData) => {
        const res = await fetch(`${API_URL}/exercises`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(exerciseData)
        })
        if (!res.ok) throw new Error("Error al crear ejercicio")
        return res.json()
    },

    //user y perfil
    getProfile: async () => {
        const res = await fetch(`${API_URL}/users/profile`, {headers: getAuthHeaders()})
        if (!res.ok) throw new Error("Error al obtener perfil")
        return res.json()
    },
    updateObjective: async (objective_id) => {
        const res = await fetch(`${API_URL}/objectives`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({objective_id})
        })
        return res.json()
    },
    saveHabits: async (habitsData) => {
        const res = await fetch(`${API_URL}/habits`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(habitsData)
        })
        return res.json()
    },

    //dashboard
    getDashboardData: async () => {
        const res = await fetch(`${API_URL}/dashboard`, {headers: getAuthHeaders()})
        return res.json()
    },

    //plan
    upgradePlan: async (planType) => {
        const res = await fetch(`${API_URL}/users/update-plan`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({plan: planType})
        })
        if (!res.ok) throw new Error("Error al procesar la suscripción")
        return res.json();
    },
    
    updatePlan: async (newPlan) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_URL}/users/downgrade`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({plan: newPlan})
        })

        if (!response.ok) {
            throw new Error('Error al actualizar el plan')
        }

        return await response.json()
    }
}