/*
---
Anuncio "Tomates" | Ir al anuncio ->

Tu comentario: No me gustan nada, son un asco
---
Anuncio "Aceitunas" | Ir al anuncio ->

Tu comentario: Ricas ricas

---

En endpoint de back consultar anuncios que contienen un comentario cuyo autor es el usuario logeado

Respuesta tipo:

anuncio->comentario->if author == userid->allusercomments[]

[
  {
    adData: { id: 1, name: "Tomates" },
    comment: "No me gustan nada, son un asco"
  },
  {
    adData: { id: 2, name: "Aceitunas" },
    comment: "Ricas ricas"
  },
]
*/

export const MyComments = () => {
  return <p>My Comments</p>
}