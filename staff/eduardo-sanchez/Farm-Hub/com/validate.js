import { ContentError, MatchError } from './errors.js';

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/;
const USERNAME_REGEX = /^[\w-]+$/;
const PASSWORD_REGEX = /^[\w-$%&=\[\]\{\}\<\>\(\)]{8,}$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const ID_REGEX = /^[0-9a-z]+$/;
const PRICE_REGEX = /^\d+(\.\d{1,2})? €\/Kg$/;
const LOCATION_REGEX = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;

//  /^\s* [-+] ? ([1 - 8] ?\d(\.\d +) ?| 90(\.0 +) ?), \s * [-+] ? ((1[0 - 7]\d(\.\d +) ?| 180(\.0 +) ?)| ([1 - 9] ?\d(\.\d +) ?)) \s * $/;

function validateName(name, explain = 'name') {
    if (typeof name !== 'string' || !NAME_REGEX.test(name))
        throw new ContentError(`${explain} is not valid`);
}

function validateUsername(username, explain = 'username') {
    if (typeof username !== 'string' || !USERNAME_REGEX.test(username))
        throw new ContentError(`${explain} is not valid`);
}

function validatePassword(password) {
    if (typeof password !== 'string' || !PASSWORD_REGEX.test(password))
        throw new ContentError('password is not valid');
}

function validatePasswordsMatch(password, passwordRepeat) {
    if (password !== passwordRepeat)
        throw new MatchError("passwords don't match");
}

function validateEmail(email) {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email))
        throw new ContentError('email is not valid');
}

function validateText(text, explain = 'text', maxLength = Infinity) {
    if (typeof text !== 'string' || !text.length || text.length > maxLength)
        throw new ContentError(`${explain} is not valid`);
}

function validateId(id, explain = 'id') {
    if (typeof id !== 'string' || !ID_REGEX.test(id))
        throw new ContentError(`${explain} is not valid`);
}

function validatePrice(price, explain = 'price') {
    if (typeof price !== 'string' || !PRICE_REGEX.test(price))
        throw new ContentError(
            `${explain} is not valid. It must be in the format "number €/Kg", e.g., "3.20 €/Kg".`
        );
}

function validateContactInfo(contactInfo, explain = 'contactInfo') {
    if (typeof contactInfo !== 'string' || !contactInfo.length)
        throw new ContentError(`${explain} is not valid`);
}

function validateGeoLocation(geoLocation, explain = 'geoLocation') {
    if (!geoLocation) {
        throw new ContentError(`${explain} is missing`);
    }

    if (
        typeof geoLocation !== 'object' ||
        !('lat' in geoLocation) ||
        !('lng' in geoLocation)
    ) {
        throw new ContentError(`${explain} is not valid: missing lat or lng`);
    }

    if (
        typeof geoLocation.lat !== 'number' ||
        typeof geoLocation.lng !== 'number'
    ) {
        throw new ContentError(
            `${explain} is not valid: lat and lng must be numbers`
        );
    }
}

// function validateMaxDistance(maxDistance, explain = 'maxDistance') {
//     if (
//         typeof maxDistance !== 'number' ||
//         maxDistance < 0 ||
//         maxDistance > 50
//     ) {
//         throw new ContentError(
//             `${explain} es no válido: debe ser un número entre 0 y 50`
//         );
//     }
// }

const validate = {
    name: validateName,
    username: validateUsername,
    password: validatePassword,
    passwordsMatch: validatePasswordsMatch,
    email: validateEmail,
    text: validateText,
    id: validateId,
    price: validatePrice,
    contactInfo: validateContactInfo,
    geoLocation: validateGeoLocation,
    // maxDistance: validateMaxDistance,
};

export default validate;

///////////////////////////////////

// if (
//     typeof maxDistance !== 'number' ||
//     maxDistance <= 0 ||
//     maxDistance > 1000
// ) {
//     throw new ContentError(
//         `${explain} must be a positive number not exceeding 1000 km`
//     );
// }

// !LOCATION_REGEX.test(location.lat) ||
// !LOCATION_REGEX.test(location.lng)

// throw new ContentError(
//   `${explain} is not valid: lat must be between -90 and 90, and lng must be between -180 and 180`
// );

// if (!location || typeof location !== 'object' || !('lat' in location) || !('lng' in location)) {
//     throw new ContentError(`${explain} is not valid: missing lat or lng`)
// }
// if (typeof location.lat !== 'number' || typeof location.lng !== 'number') {
//     throw new ContentError(`${explain} is not valid: lat and lng must be numbers`)
// }

///////////////////////////////////

// if (!LOCATION_REGEX.test(location.lat) || !LOCATION_REGEX.test(location.lng) ||
//     typeof location.lat !== 'object' || typeof location.lng !== 'object')
//     throw new ContentError(`${explain} is not valid`)

// function validatePrice(price, explain = 'price') {
//     if (typeof price !== 'string' || !/^\d+(\.\d{1,2})? €\/Kg$/.test(price)) {
//         throw new ContentError(`${explain} is not valid. It must be in the format "number €/Kg", e.g., "3.20 €/Kg".`);
//     }
// }
