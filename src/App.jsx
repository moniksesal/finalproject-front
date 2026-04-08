import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import ProfileSetup from './pages/ProfileSetup'
import RoutinesPage from './pages/RoutinesPage'
import CreateRoutine from './pages/CreateRoutine'
import RoutineDetail from './pages/RoutineDetail'
import CreateExercise from './pages/CreateExercise'
import WorkoutSession from './pages/WorkoutSession'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import './App.css'

function App() {
    //está autenticado?
    const isAuthenticated = !!localStorage.getItem('token')

    return (
        <Router>
            {/*mostrar navbar solo cuando el user ha iniciado sesión */}
            {isAuthenticated && <Navbar />}

            <div className={isAuthenticated ? 'mainWrapper' : ''}>
                <Routes>
                {/*Ruta pública*/}
                <Route
                    path="/login"
                    element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
                />

                {/*rutas privadas solo con token */}
                {isAuthenticated ? (
                    <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/perfil/configuracion" element={<ProfileSetup />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/rutinas" element={<RoutinesPage />} />
                    <Route path="/rutinas/:id" element={<RoutineDetail />} />
                    <Route path="/rutinas/crear/:day" element={<CreateRoutine />} />
                    <Route path="/ejercicios/nuevo" element={<CreateExercise />} />
                    {/*<Route path="/entrenar/:id" element={<WorkoutSession />} />*/}
                    {/* Si entra a cualquier ruta que no exista, redirige a dashboard */}
                    <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    // si no está autenticado y entra a cualquier ruta, se le redirige al login
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
                </Routes>
            </div>
        </Router>
    )
}

export default App