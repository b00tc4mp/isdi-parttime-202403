Continuamos creando una carpeta `utils` en la app dentro de la carpeta `src`. Y dentro de la carpeta `utils` creamos un archivo `extractPayloadFromJwt.js` para poder extraer el payload del token. Y así poder usar el `sub` del payload al que tenemos el username.  Creamos un `REGEX` para tener esa validación de datos del token.

![Captura.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/9e0112b3-7b18-4926-8695-bd568ae8336d/6d9c93ce-7c96-4470-b0c1-ca73f59e578f/Captura.png)

En el caso de un JWT, este token está formado por tres partes separadas por puntos (`.`): `header.payload.signature`.

### Explicación de la línea:

```jsx
const [, payload64] = sessionStorage.token.split(".");

```

1. **`sessionStorage.token.split(".")`**:
    - Divide el token en un array de tres partes usando el punto como delimitador. El resultado será un array como `["header", "payload", "signature"]`.
2. **Desestructuración del array**:
    - La sintaxis de desestructuración `const [, payload64] = ...` se usa para extraer la segunda parte del array (el payload) y asignarla a la variable `payload64`.
    - El primer elemento del array (el header) no se necesita en este caso, por lo que se omite usando una coma sin nada antes de ella.
    - Equivale a hacer algo como:
        
        ```jsx
        const parts = sessionStorage.token.split(".");
        const payload64 = parts[1]; // El payload es la segunda parte del array
        
        ```
        

### Ejemplo detallado:

Supongamos que tienes el siguiente token:

```jsx
const token = "header.payload.signature";

```

Al usar `split`:

```jsx
const parts = token.split("."); // ["header", "payload", "signature"]

```

Para extraer solo la segunda parte (payload):

```jsx
const [, payload64] = parts; // payload64 será "payload"

```

La coma antes de `payload64` indica que el primer elemento del array (`header`) se ignora, y se asigna el segundo elemento (`payload`) a la variable `payload64`.

### Sintaxis de desestructuración:

Esta técnica es útil cuando solo necesitas algunos elementos de un array y quieres ignorar otros. En este caso, se ignora el primer elemento y se obtiene directamente el segundo:

```jsx
const [, payload64,] = ["header", "payload", "signature"];
// payload64 tendrá el valor "payload"

```

Esta forma de desestructuración hace el código más conciso y claro cuando solo te interesa un elemento específico del array.

```jsx
import errors from "../error.js"

const { ContentError, MatchError } = errors

const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

function extractPayloadFromJWT(token) {
  // Verifica si el token cumple con el formato esperado usando una expresión regular (JWT_REGEX)
  if (!JWT_REGEX.test(token)) {
    throw new ContentError("token is not valid");
  }
  
  // Divide el token en sus tres partes (header, payload, signature) usando el punto como delimitador
  const [, payload64] = sessionStorage.token.split(".");

  // Decodifica la parte del payload desde base64 a una cadena JSON
  const payloadJSON = atob(payload64);

  // Parsea la cadena JSON para obtener un objeto JavaScript
  const payload = JSON.parse(payloadJSON);

  // Extrae el campo "exp" (expiration time) del payload
  const { exp } = payload;

  // Obtiene el tiempo actual en segundos
  const nowSeconds = Date.now() / 1000;

  // Verifica si el token ha expirado
  if (nowSeconds >= exp) {
    throw new MatchError("token expired");
  }

  // Devuelve la carga útil (payload) si el token es válido y no ha expirado
  return payload;
}

```