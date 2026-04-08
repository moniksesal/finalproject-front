# GAINSCLOUD - Frontend

Este es el cliente de mi aplicación de gestión de entrenamientos, desarrollado con **React**. La interfaz permite a los usuarios gestionar sus rutinas, registrar entrenamientos en tiempo real y acceder a funciones exclusivas mediante un sistema de suscripción Premium.


## Características Principales

* **Dashboard Personalizado:** Visualización de progreso y resumen de actividad.
* **Gestor de Rutinas:** Creación, edición y eliminación de rutinas por días de la semana.
* **Modo Entrenamiento:** Después de hacer la rutina, el usuario entra en el modo entrenamiento y pone el peso que ha hecho o modifica repeticiones si es necesario.
* **Sistema Premium:** Restricción de creación de ejercicios personalizados para usuarios que no sean de pago.
* **Validación de Datos:** Protección de entradas para evitar números negativos o caracteres inválidos en los registros.
* **Interfaz Adaptable:** Diseño limpio utilizando CSS Modules.
* **Estilo de vida ajustable:** El usuario puede ir modificando en Ajustes su estilo de vida, y esto hará que dentro de la App haya mensajes inteligentes.


## Tecnologías Utilizadas

* **React 18**
* **React Router Dom**
* **CSS Modules**
* **Vite**
* **JavaScript**


## Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO_FRONT]
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Variables de Entorno:**
    Crear un archivo `.env` añadir la URL del backend:
    ```env
    VITE_API_URL=http://localhost:5000
    ```

4.  **Iniciar la aplicación:**
    ```bash
    npm run dev
    ```

## Estructura del Proyecto

finalproject-front-gym/
├── public/
│   ├── favicon.svg
├── src/
│   ├── assets/
│   │   ├── Logo.png
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── NavBar.module.css
│   ├── api/
│   │   └── auth.js
│   ├── pages/
│   │   ├── CreateExercise.jsx
│   │   ├── CreateExercise.module.css
│   │   ├── CreateRoutine.jsx
│   │   ├── CreateRoutine.module.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.module.css
│   │   ├── Login.jsx
│   │   ├── Login.module.css
│   │   ├── Pricing.jsx
│   │   ├── Pricing.module.css
│   │   ├── ProfileSetup.jsx.
│   │   ├── ProfileSetup.module.css
│   │   ├── RoutineDetail.jsx
│   │   ├── RoutineDetail.module.css
│   │   ├── RoutinesPage.jsx
│   │   ├── RoutinesPage.module.css
│   │   ├── WorkoutSession.jsx 
│   │   ├── WorkoutSession.module.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│   └── index.css
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── eslint.config.js
├── vite.config.js
└── README.md

## Funcionalidades.

- Registro
- Login
- Dashboard con saludo, frase personalizada, mensaje de coach personalizado según tu perfil, total de ejercicios, total de rutinas, actividad reciente y visualizador de rutinas
- Panel de calendario semanal con rutinas
- Si clickas en cada rutina, se puede modificar el entrenamiento (peso, reps, series) para guardar qué has hecho realmente
- Panel de planes para hacerte premium y poder hacer ejercicios personalizados
- Panel de ajustes para modificar hábitos
- Salir

## Funcionalidades a futuro.

- Usar los kg para hacer gráficas de progreso
- Usar los kg para comparar el último peso que habías puesto VS el nuevo
- Enfocarlo a red social para que cada usuario pueda subir sus entrenamientos y se lo puedan compartir entre ellos
- Crear apartado de alimentación y relacionarlo con el entrenamiento
- Gráficas de proteina
- Hacer apartado de suplementación
