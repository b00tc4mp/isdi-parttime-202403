import errors, { SystemError } from "com/errors";
import extractPayloadFromJWT from "../util/extractPayloadFromJWT";

const getUserName = () => {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {

        })
}