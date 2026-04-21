# PadelMaster (NachoPadel)

Aplicación **móvil (iOS/Android) y web** construida con **Expo + React Native + TypeScript** para **explorar un catálogo de productos de pádel por categorías**, consultar detalles y **acceder rápidamente a productos mediante escaneo de códigos QR**. Incluye un flujo para **añadir productos** (POST a API) y **capturar fotos con la cámara** para el alta.

---

## Índice

- [Descripción general](#descripción-general)
- [Características principales](#características-principales)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso del proyecto](#uso-del-proyecto)
- [Configuración](#configuración)
- [Ejemplos prácticos](#ejemplos-prácticos)
- [Buenas prácticas](#buenas-prácticas)
- [Posibles errores y solución de problemas](#posibles-errores-y-solución-de-problemas)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Autor / contacto](#autor--contacto)

---

## Descripción general

PadelMaster organiza productos de pádel en categorías (palas, pelotas, ropa, mochilas/paleteros, accesorios y zapatillas) y ofrece:

- navegación por categorías,
- listado y búsqueda,
- escaneo de QR para abrir la ficha de detalle asociada,
- creación de nuevos productos a través de formulario,
- captura de foto desde cámara para reutilizarla en el flujo de alta.

---

## Características principales

- **Categorías** con navegación directa:
  - Palas, Pelotas, Ropa, Mochilas y Paleteros, Accesorios, Zapatillas.
- **Listado reutilizable** (componente `ProductList`) con:
  - carga, error con “Reintentar”, pull-to-refresh,
  - búsqueda por texto,
  - diseño responsive por columnas (según ancho de pantalla).
- **Escáner de QR**:
  - solicitud de permisos de cámara,
  - pantalla de escaneo a pantalla completa,
  - redirección a pantallas de detalle según prefijo del código (ej. `p-`, `pe-`, `r-`, `m-`, `a-`, `z-`).
- **Alta de producto (POST)**:
  - validación de formulario (nombre, precio, categoría),
  - previsualización de imagen por URL,
  - acceso a cámara para hacer foto.

---

## Tecnologías utilizadas

- **TypeScript**
- **React Native**
- **Expo**
- **Expo Router** (rutas basadas en archivos)
- **expo-camera** (permisos, cámara, escaneo QR)
- **React Navigation** (tabs/elementos de navegación)
- **ESLint** (`eslint-config-expo`)
- `lodash-es`
- `dotenv` (dependencia presente)

---

## Estructura del proyecto

```text
.
├─ app/
│  ├─ (tabs)/
│  │  ├─ index.tsx              # Categorías
│  │  ├─ scanner.tsx            # Pantalla de permisos + CTA escaneo
│  │  ├─ NewProduct.tsx         # Alta de producto (POST)
│  │  └─ _layout.tsx            # Layout tabs
│  ├─ Detalles/                 # Detalles por tipo (según QR)
│  ├─ Fetch/
│  │  ├─ ProductList.tsx        # Listado genérico
│  │  └─ Fetch*.tsx             # Fetch por categoría
│  ├─ camera.tsx                # Captura foto
│  ├─ qrScan.tsx                # Vista de cámara para QR
│  ├─ UserCard.tsx              # Tarjeta de producto
│  ├─ types.ts                  # Tipos
│  ├─ _layout.tsx               # Layout raíz
│  └─ +not-found.tsx            # 404 rutas
├─ assets/
├─ app.json
├─ eas.json
├─ package.json
└─ tsconfig.json
```

---

## Requisitos previos

- Node.js (LTS recomendado)
- npm
- Android Studio (emulador) y/o Xcode (iOS Simulator en macOS) o dispositivo físico
- (Opcional) EAS CLI para builds (según `eas.json`)

---

## Instalación

```bash
git clone https://github.com/IgnacioSanchezYuste/PadelMaster.git
cd PadelMaster
npm install
```

---

## Uso del proyecto

```bash
npm run start
```

Atajos:

```bash
npm run android
npm run ios
npm run web
npm run lint
```

---

## Configuración

### API

El alta de productos usa una URL base (definida en el código) similar a:

- `https://ignaciosanchezyuste.es/API_PADEL`

Recomendación: mover la URL base a variables de entorno y centralizarla en un módulo `config.ts`.

### Permisos de cámara

El proyecto requiere permisos de cámara para escaneo y captura. Si falla:
- comprueba permisos del sistema,
- prueba con un build de desarrollo si Expo Go limita funcionalidades.

---

## Ejemplos prácticos

### Escaneo de QR → detalle

Según el prefijo del QR:
- `p-123` → detalle de pala (id 123)
- `pe-45` → detalle de pelota
- `r-88` → detalle de ropa
- `m-12` → detalle de mochila/paletero
- `a-9` → detalle de accesorio
- `z-77` → detalle de zapatilla

---

## Buenas prácticas

- No versionar `.env` con secretos; usar `.env.example`.
- Centralizar `BASE_URL` de API y mapear endpoints por categoría en un único lugar.
- Añadir validación robusta de URLs en el formulario.

---

## Posibles errores y solución de problemas

- **No escanea / cámara no abre**: revisa permisos y ejecución en dispositivo/emulador.
- **Errores HTTP**: confirma que el backend esté disponible y que el endpoint devuelva JSON en el formato esperado.
- **Navegación a ruta inexistente**: verifica nombres exactos de archivos/rutas en `app/`.

---

## Contribución

1. Fork
2. Rama: `feat/mi-cambio`
3. Cambios + `npm run lint`
4. Pull Request con descripción y pasos de prueba

---

## Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Consulta el archivo [`LICENSE`](./LICENSE) para más detalles.

---

## Autor / contacto

- Ignacio Sanchez Yuste (GitHub: `@IgnacioSanchezYuste`)
