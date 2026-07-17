# Modelo de construcción y CI/CD

## Frontend de visualización de ontologías

## Principio general

Se construye capa por capa, de abajo hacia arriba, exactamente en el orden en que se definieron las dependencias. Ningún componente se da por avanzado sin que su prueba unitaria correspondiente, ya definida en el documento de pruebas, esté en verde. Esto no es una sugerencia de proceso, es una puerta que el pipeline hace cumplir de forma automática, ninguna rama llega a `main` con pruebas rotas.

---

## Orden de construcción

| Orden | Capa                     | Componentes                                                                                  | Pruebas que deben pasar                                    | Depende de           |
| ----- | ------------------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------- |
| 1     | Dominio                  | `OntEntity`, `OntClass`, `Individual`, `Relation`, `OntologyModel`                           | `ont-class.test.ts`, `individual.test.ts`                  | Nada                 |
| 2     | Parseo                   | `ParserFactory`, `TripleToModelMapper`, los tres parsers concretos                           | `parser-factory.test.ts`, `triple-to-model-mapper.test.ts` | Dominio              |
| 3     | Lógica de grafo          | `GraphModelBuilder`, `CollapseManager`, `FilterService`, `SearchService`, `SelectionService` | los cinco archivos de prueba correspondientes              | Dominio, Parseo      |
| 4     | Presentación (sin React) | `CytoscapeRenderer`, `StyleConfig`, `LayoutController`, `ExportController`                   | pruebas de humo                                            | Lógica de grafo      |
| 5     | Presentación (React)     | `App.tsx` y el resto de componentes, `use-app-controller.ts`                                 | pruebas de integración ligeras, si se agregan más adelante | Todas las anteriores |

Cada fila es, en la práctica, una rama de Git y un ciclo completo de construcción, prueba y fusión antes de pasar a la siguiente. La capa de dominio no arranca hasta no tener las interfaces ya definidas (que ya las tenemos), y la de presentación con React no arranca hasta que `CytoscapeRenderer` implemente `IGraphRenderer` con sus pruebas de humo en verde.

---

## Flujo de Git

**Estrategia de ramas.** Trunk-based simplificado. `main` es la única rama larga, protegida, siempre desplegable. Cada componente se construye en una rama corta, nombrada con el número de historia de usuario que resuelve, por ejemplo `feature/hu04-dominio-ontclass` o `feature/hu13-collapse-manager`. La rama vive días, no semanas, y se fusiona apenas su prueba está en verde y el pipeline pasa completo.

**Convención de commits.** Conventional Commits, sin excepción, porque facilita generar un historial legible y porque algunas acciones del pipeline (como el versionado) pueden automatizarse leyendo el tipo de commit más adelante.

```
feat(dominio): agrega OntClass con soporte de subclases
test(dominio): cubre getAllDescendants con jerarquía de tres niveles
fix(parseo): corrige mapeo de rdf:type a RelationKind.TYPE_OF
refactor(grafo): extrae lógica de agrupación a CollapseManager
chore(ci): agrega job de cobertura mínima
```

**Protección de `main`.** Al ser un pipeline local, la puerta de calidad no depende de un servidor remoto que bloquee la fusión, depende de un git hook que se ejecuta en la propia máquina antes de que el commit o el push lleguen a existir. La sección de pipeline local, más abajo, detalla exactamente qué corre en cada hook y en qué momento.

**`.gitignore` mínimo esperado**, `node_modules`, `dist`, `coverage`, y los archivos de configuración local de VSCode que no deban compartirse (`*.local.json`), aunque `.vscode/settings.json` y `.vscode/extensions.json` sí se versionan, ver siguiente sección.

---

## Configuración de VSCode

Se versiona una carpeta `.vscode/` en la raíz del repositorio, para que cualquier máquina donde se clone el proyecto quede configurada igual, sin pasos manuales.

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "vitest.explorer",
    "eamodio.gitlens",
    "editorconfig.editorconfig"
  ]
}
```

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "js/ts.tsdk.path": "node_modules/typescript/lib"
}
```

La extensión `vitest.explorer` es la pieza clave para el flujo de "ir probando cada componente conforme se genera", da una vista de árbol con cada archivo de prueba, y permite correr o depurar una prueba puntual con un clic, sin salir del editor ni tocar la terminal.

---

## Pipeline CI/CD local

Nada de servidores remotos ni servicios en la nube. El pipeline corre completo en tu máquina, disparado por git hooks, con Husky más lint-staged. Coherente, de paso, con la misma lógica de HU-23, tus datos y ahora también tu proceso de integración se quedan en tu equipo.

**Instalación.**

```
npm install --save-dev husky lint-staged
npx husky init
```

**Hook de pre-commit**, rápido, solo revisa lo que se va a comitear, no el proyecto entero.

```bash
# .husky/pre-commit
npx lint-staged
```

```json
// package.json (fragmento)
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

**Hook de pre-push**, aquí corre el pipeline completo, equivalente a lo que antes hacía el job `verificar` en la nube. Si algún paso falla, el hook devuelve un código distinto de cero, y Git cancela el push, el código nunca sale de tu máquina en un estado roto.

```bash
# .husky/pre-push
npm run ci:local
```

```json
// package.json (fragmento)
"scripts": {
  "lint": "eslint src",
  "type-check": "tsc --noEmit",
  "test:cov": "vitest run --coverage",
  "build": "vite build",
  "ci:local": "npm run lint && npm run type-check && npm run test:cov && npm run build"
}
```

Cuatro pasos secuenciales, exactamente los mismos de antes, lint, chequeo de tipos, pruebas con cobertura, y build. La diferencia es dónde corren, en tu propio equipo, con el mismo `npm run ci:local` que puedes ejecutar manualmente en cualquier momento mientras trabajas, sin esperar a hacer push para enterarte de que algo se rompió.

**Sobre el despliegue.** Como no hay backend ni servicio en la nube involucrado, "desplegar" se reduce a tener el artefacto estático listo y verificado. `npm run build` deja el resultado en `dist/`, y `npm run preview` lo sirve localmente para revisarlo como si fuera producción, antes de copiarlo a donde decidas alojarlo el día que quieras compartirlo.

**Si más adelante quieres paridad con un CI en la nube.** La herramienta `act` permite ejecutar un archivo de GitHub Actions de forma local, con Docker, sin depender de que el repositorio esté en GitHub. No es necesaria ahora, dado que Husky ya resuelve el pipeline local sin esa capa extra, pero queda como opción si en el futuro se retoma la idea de un CI compartido entre varias máquinas.

**Umbral de cobertura.** Se configura en `vitest.config.ts` un mínimo por carpeta, más exigente en las capas con más lógica.

```typescript
// vitest.config.ts (fragmento relevante)
coverage: {
  thresholds: {
    'src/domain/**': { statements: 90 },
    'src/graph-logic/**': { statements: 85 },
    'src/parsing/**': { statements: 80 },
  },
}
```

Presentación queda fuera del umbral estricto, en línea con lo ya acordado, ahí basta con pruebas de humo.

---

## Definición de terminado por componente

Un componente se considera terminado, y por tanto listo para fusionar a `main`, cuando cumple todo lo siguiente. Implementación completa según su interfaz ya definida. Prueba unitaria correspondiente escrita y en verde, siguiendo el documento de pruebas. Lint y chequeo de tipos sin advertencias. `npm run ci:local` en verde, lo que el hook de pre-push exige de todas formas antes de dejar salir el código. Ningún archivo del componente supera las 100 líneas, según HU-19.

Esto convierte cada historia de usuario en una unidad de trabajo verificable de principio a fin, se abre la rama, se implementa contra la interfaz ya acordada, se corre la prueba en el explorador de Vitest dentro de VSCode mientras se escribe el código, y el propio git hook impide el push si algo quedó roto, sin que tengas que acordarte de correr nada a mano.
