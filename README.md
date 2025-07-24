CRM de Contactos con React y Supabase 🚀
Este es un proyecto de un sistema de gestión de relaciones con clientes (CRM) enfocado en la administración de contactos. La aplicación permite a los usuarios crear, leer, actualizar, filtrar y eliminar contactos de manera eficiente. Está construida con tecnologías modernas como React, Vite, Tailwind CSS y utiliza Supabase como backend.

✨ Características Principales
Gestión de Contactos (CRUD): Funcionalidad completa para Crear, Leer, Actualizar y Eliminar contactos.

Filtrado y Búsqueda Avanzada: Filtra contactos por nombre, vendedor asignado, estado o zona geográfica.

Backend con Supabase: Utiliza la base de datos y la API de Supabase para una gestión de datos rápida y en tiempo real.

Autocompletado de Direcciones: Integración con la API de Google Places para autocompletar direcciones de manera precisa, extrayendo calle, ciudad, provincia y código postal.

Diseño Moderno y Responsivo: Interfaz limpia y amigable construida con Tailwind CSS.

Gestión Dinámica: Permite añadir nuevos vendedores y estados directamente desde el formulario de contacto sin recargar la página.

Componentes Reutilizables: Estructura de proyecto modular y escalable basada en componentes de React.

🛠️ Stack Tecnológico
Frontend: React (con Hooks) y Vite

Styling: Tailwind CSS

Backend y Base de Datos: Supabase

APIs Externas: Google Maps Places API

Iconos: Heroicons

⚙️ Configuración y Puesta en Marcha
Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

1. Prerrequisitos
   Asegúrate de tener instalado Node.js (versión 18 o superior) y npm en tu máquina.

2. Clonar el Repositorio
   git clone https://github.com/tu-usuario/crm-react-supabase.git
   cd crm-react-supabase

3. Instalar Dependencias
   Ejecuta el siguiente comando en la terminal para instalar todas las dependencias del proyecto.

npm install

4. Configurar Variables de Entorno
   Para que la aplicación se conecte con los servicios de Supabase y Google Maps, necesitas proporcionar tus propias claves de API.

Crea un archivo llamado .env en la raíz del proyecto. Puedes duplicar el archivo .env.example si existe, o crearlo desde cero con el siguiente contenido:

# .env

# Claves de Supabase (Encuéntralas en tu Dashboard de Supabase > Project Settings > API)
VITE_SUPABASE_URL="https://xxxxxxxxxxxxxxxxxxxx.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxxxxxx.xxxxxxxxxxxxx"

# Clave de Google Maps (Encuéntrala en tu Google Cloud Console)
# Asegúrate de habilitar la "Places API"
VITE_GOOGLE_MAPS_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXX"

¿Cómo obtener estas claves?

Claves de Supabase:

Ve a tu Dashboard de Supabase.

Selecciona tu proyecto (o crea uno nuevo).

En el menú lateral, ve a Project Settings (el ícono de engranaje) > API.

En la sección "Project API keys", copia la URL del Proyecto (VITE_SUPABASE_URL) y la clave pública anon (VITE_SUPABASE_ANON_KEY).

Clave de Google Maps:

Ve a la Google Cloud Console.

Crea un nuevo proyecto o selecciona uno existente.

En el menú de navegación, ve a APIs & Services > Library.

Busca y habilita la Places API.

Ve a APIs & Services > Credentials para crear o encontrar tu clave de API. ¡Importante! Por seguridad, restringe el uso de tu clave de API para que solo funcione en el dominio de tu aplicación.

5. Configurar la Base de Datos de Supabase
   El proyecto necesita tres tablas en tu base de datos de Supabase: contactos, vendedores y estados.

Puedes ir al SQL Editor en tu dashboard de Supabase y ejecutar el siguiente script para crear y configurar las tablas correctamente:

-- Tabla para Vendedores
CREATE TABLE vendedores (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
nombre TEXT NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla para Estados de Contacto
CREATE TABLE estados (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
nombre TEXT NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla principal de Contactos
CREATE TABLE contactos (
id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
created_at TIMESTAMPTZ DEFAULT NOW(),
nombre TEXT NOT NULL,
cuit_dni TEXT,
email TEXT,
telefono TEXT,
zona TEXT,
pais TEXT,
clasificacion TEXT,
profesion TEXT,
especialidades JSONB,
direccion_facturacion JSONB,
direccion_entrega JSONB,
direccion_entrega_2 JSONB,
vendedor_id BIGINT REFERENCES vendedores(id) ON DELETE SET NULL,
estado_id BIGINT REFERENCES estados(id) ON DELETE SET NULL
);

-- Opcional: Insertar algunos datos iniciales para probar
INSERT INTO vendedores (nombre) VALUES ('Hernán'), ('Ana');
INSERT INTO estados (nombre) VALUES ('Nuevo'), ('Contactado'), ('Activo'), ('Inactivo');

6. Ejecutar el Proyecto
   ¡Todo listo! Ahora puedes levantar el servidor de desarrollo local.

npm run dev

La aplicación estará disponible en http://localhost:5173 (o el puerto que Vite indique en tu terminal).

🚀 Scripts Disponibles
npm run dev: Inicia el servidor de desarrollo con Hot-Reload.

npm run build: Compila la aplicación para producción en la carpeta dist/.

npm run lint: Ejecuta el linter para revisar la calidad del código.

npm run preview: Previsualiza la build de producción localmente.