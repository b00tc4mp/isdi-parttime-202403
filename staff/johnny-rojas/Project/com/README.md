import { ContentError, MatchError } from "./errors.js"

// Regex para nombre (permitiendo letras y algunos caracteres especiales)
export const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/
// Acepta nombres con al menos un carácter, incluyendo letras mayúsculas y minúsculas, y caracteres especiales como =, [], {}, <>, ().

// Regex para nombre de sala (permitiendo letras, números y algunos caracteres especiales, con un espacio en el medio, y una longitud total de hasta 20 caracteres)
export const NAMEROOM_REGEX = /^[\w\-_\@\.]{1,10}\s[\w\-_\@\.]{1,10}$/
// Acepta nombres con hasta 10 caracteres antes y después de un espacio, permitiendo letras, números, guiones, guiones bajos, arrobas y puntos.

// Regex para contraseña (letras, números, y algunos caracteres especiales, mínimo 4 caracteres)
export const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{4,}$/
// Acepta contraseñas con al menos 4 caracteres, permitiendo letras, números y caracteres especiales como -, $, %, &, =, [], {}, <>, ().

// Regex para correo electrónico
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// Valida correos electrónicos con el formato estándar, incluyendo nombres locales y dominios con TLDs (dominios de nivel superior).

// Regex para teléfono (opcionalmente con prefijo internacional, varios formatos para Venezuela y España)
export const PHONE_REGEX = /^(?:\+58\s(?:2[0-9]{1,2}|4[0-9]{1,2}|[0-9]{3})\s\d{7,8}|\+34\s(?:[6-9]\d{2}\s\d{6}|[2-9]\d{8}))$/
// Acepta números de teléfono con prefijo internacional para Venezuela (+58) y España (+34), permitiendo varios formatos de números de teléfono locales.

// Regex para ID (solo números y letras en minúsculas)
export const ID_REGEX = /^[0-9a-z]+$/
// Acepta identificadores que solo contienen números y letras en minúsculas, sin espacios ni caracteres especiales.

// Regex para región (solo Norte, Sur, Este, Oeste en mayúsculas y minúsculas)
export const REGION_REGEX = /^(Norte|Sur|Este|Oeste|norte|sur|este|oeste)$/
// Acepta los nombres de región "Norte", "Sur", "Este" y "Oeste" en mayúsculas o minúsculas, sin otros caracteres.


// Regex para precio mayor que 0 y divisa (USD, EUR, VES)
export const PRICE_REGEX = /^(?!0$)(?:[1-9]\d*\.?\d*|\.\d+)\s*(USD|EUR|VES)$/
// Acepta precios mayores que 0 con decimales opcionales, seguido de un espacio y una divisa, donde las divisas permitidas son USD, EUR o VES.

// Regex para disponibilidad (solo Disponible o No disponible)
export const AVAILABILITY_REGEX = /^(Disponible|No disponible)$/
// Acepta los estados de disponibilidad "Disponible" o "No disponible" en español, sin otros valores.

// Regex para coordenadas (longitud)
export const LONGITUDE_REGEX = /^-?([1-9]?\d(\.\d+)?|1[0-7]\d(\.\d+)?|180(\.0+)?)$/
// Acepta coordenadas de longitud entre -180 y 180 grados, con hasta 6 decimales opcionales.

// Regex para coordenadas (latitud)
export const LATITUDE_REGEX = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/
// Acepta coordenadas de latitud entre -90 y 90 grados, con hasta 6 decimales opcionales.
