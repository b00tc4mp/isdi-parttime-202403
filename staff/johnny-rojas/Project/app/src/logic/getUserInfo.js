import extractPayloadFromJWT from "../../utils/extractPayloadFromJWT"

export function getUserId() {
    const { sub: userId } = extractPayloadFromJWT(sessionStorage.token)

    return userId
}

export function getUserRole() {
    const { role } = extractPayloadFromJWT(sessionStorage.token)

    return role
}
