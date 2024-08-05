# Regular Expressions for Validation

```javascript
// Validates names containing letters and certain special characters (brackets, parentheses).
export const NAME_REGEX = /^[a-zA-Z=$begin:math:display$$end:math:display$\{\}\<\>$begin:math:text$$end:math:text$]{1,}$/;

// Validates room names allowing letters, numbers, spaces, dashes, underscores, `@`, and dots. The length can be between 1 and 100 characters.
export const NAMEROOM_REGEX = /^[\w\s\-\_\@\.]{1,100}$/;

// Validates passwords that contain alphanumeric characters and specific symbols, with a minimum length of 4 characters.
export const PASSWORD_REGEX = /^[\w-$%&=$begin:math:display$$end:math:display$\{\}\<\>$begin:math:text$$end:math:text$]{4,}$/;

// Validates email addresses according to common email format standards.
export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(($begin:math:display$[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}$end:math:display$)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validates phone numbers, allowing an optional leading plus sign followed by 1 to 15 digits.
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

// Validates IDs consisting of lowercase alphanumeric characters.
export const ID_REGEX = /^[0-9a-z]+$/;

// Validates region names, permitting specific names in both uppercase and lowercase.
export const REGION_REGEX = /^(Norte|Sur|Este|Oeste|norte|sur|este|oeste)$/;

// Validates prices with optional decimal values and currency units (USD, EUR, VES), ensuring that the value is not zero.
export const PRICE_REGEX = /^(?!0$)(?:[1-9]\d*\.?\d*|\.\d+)\s*(USD|EUR|VES)$/;

// Validates availability status, allowing either "Disponible" or "No disponible".
export const AVAILABILITY_REGEX = /^(Disponible|No disponible)$/;

// Validates geographic coordinates in the format `[longitude, latitude]`, ensuring values are within valid ranges.
export const COORDINATES_REGEX = /^\s*$begin:math:display$\\s*(-?([1-9]?\\d(\\.\\d+)?|1[0-7]\\d(\\.\\d+)?|180(\\.0+)?))\\s*,\\s*(-?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?))\\s*$end:math:display$\s*$/;