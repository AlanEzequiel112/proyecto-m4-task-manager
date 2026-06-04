# Task Manager - PI M4

## Descripción

Task Manager es una aplicación web SPA desarrollada con React y TypeScript que permite a los usuarios gestionar sus tareas personales de forma segura y persistente.

La aplicación incluye autenticación de usuarios, almacenamiento de tareas en la nube mediante Firebase Firestore y envío de resúmenes por correo electrónico utilizando AWS SES.

## Tecnologías utilizadas

* React
* TypeScript
* Firebase Authentication
* Cloud Firestore
* AWS SES
* Vercel Functions
* Vitest
* React Testing Library
* Vercel

## Funcionalidades

### Autenticación

* Registro de usuarios mediante email y contraseña.
* Inicio y cierre de sesión.
* Persistencia de sesión.
* Manejo de errores de autenticación.

### Gestión de tareas

* Crear tareas.
* Editar tareas.
* Eliminar tareas.
* Marcar tareas como completadas.
* Persistencia en Cloud Firestore.
* Separación de tareas por usuario autenticado.
* Actualización automática de la interfaz mediante Firestore.

### Email

* Envío de resumen de tareas por correo electrónico.
* Integración con AWS SES mediante Vercel Functions.
* Protección de credenciales mediante variables de entorno.

## Arquitectura

El proyecto se encuentra organizado por responsabilidades:

```text
src/
├─ components/
├─ hooks/
├─ pages/
├─ services/
├─ tests/
├─ types/
└─ utils/

api/
└─ send-task-summary.ts
```

### Decisiones arquitectónicas

* Firebase Authentication para gestionar usuarios.
* Cloud Firestore para persistencia en tiempo real.
* AWS SES para envío de correos.
* Vercel Functions para proteger credenciales AWS.
* TypeScript para mejorar el tipado y reducir errores.
* Testing con Vitest y React Testing Library.

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd task-manager-pi-m4
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Ejecutar tests:

```bash
npm run test:run
```

Generar build:

```bash
npm run build
```

## Variables de entorno

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SES_FROM_EMAIL=
```

## Flujo de envío de emails

1. El usuario presiona "Enviar resumen".
2. La aplicación invoca una Vercel Function.
3. La función genera el resumen de tareas.
4. AWS SES envía el correo electrónico.
5. El usuario recibe el resumen en su bandeja de entrada.

## Testing

Actualmente el proyecto incluye:

* Tests unitarios para manejo de errores de Firebase.
* Tests de componente para TaskForm.

## URL de producción

https://task-manager-pi-m4.vercel.app

## Uso de Inteligencia Artificial

Durante el desarrollo se utilizó ChatGPT como herramienta de apoyo para:

* Resolución de errores de integración.
* Configuración de Firebase y AWS SES.
* Implementación de testing con Vitest.
* Organización de la arquitectura del proyecto.
* Revisión de buenas prácticas y documentación.

Las respuestas generadas fueron analizadas y adaptadas antes de incorporarse al proyecto, priorizando siempre la comprensión del código implementado.
