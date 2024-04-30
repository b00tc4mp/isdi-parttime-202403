// beginner-home - verbs
//     1. mostrar en pantalla los verbos en aleman de forma aleatoria
//     2. con el index obtenido del verbo en aleman buscar en el array de verbos en espanol
//     3. validar si el verbo colocado en el input coincide con el del espanol
//      3.1 si es verdader mostrar el siguiente verbo
//      3.2 si es falso mostrar error
//         3.2.1 si se equivoca otra vez darle pista
//         3.2.2 mostrar una opcion de seguir con otro mas
//falta limpiar los botones de error una vez que se acierta el verbo
// falta limpiar el input una vez que se skipea


const verbsGerman = [
    "sein", "haben", "werden", "können", "müssen", "sagen", "geben", "kommen", "wollen", "gehen",
    "sehen", "lassen", "stehen", "finden", "bleiben", "liegen", "halten", "nehmen", "machen", "dürfen",
    "spielen", "hören", "sollen", "arbeiten", "fahren", "sprechen", "laufen", "essen", "trinken", "schreiben",
    "lesen", "verstehen", "schlafen", "bringen", "glauben", "fühlen", "suchen", "bekommen", "beginnen", "fragen",
    "lernen", "öffnen", "singen", "schwimmen", "anrufen", "kaufen", "sehen"
];

const verbsSpanish = [
    "ser/estar", "tener", "convertirse", "poder", "deber", "decir", "dar", "venir", "querer", "ir",
    "ver", "permitir/dejar", "estar de pie", "encontrar", "permanecer/quedarse", "acostarse", "sostener", "tomar", "hacer", "poder",
    "jugar", "escuchar", "deber", "trabajar", "conducir", "hablar", "caminar", "comer", "beber", "escribir",
    "leer", "entender", "dormir", "traer/llevar", "creer", "sentir", "buscar", "obtener", "comenzar", "preguntar",
    "aprender", "abrir", "cantar", "nadar", "llamar", "comprar", "ver"
];
let indexVerb;
let acumulationError = 0;
let inputVerb = document.querySelector('.input-verb')
let errorVerb = document.getElementById('errorVerb')


function showVerb() {
    indexVerb = Math.floor(Math.random() * verbsGerman.length)
    const showedVerb = verbsGerman[indexVerb]
    const elementVerb = document.getElementById('showVerb')
    elementVerb.innerText = showedVerb
    inputVerb.value = ''
}

document.addEventListener('DOMContentLoaded', showVerb);

let checkButton = document.getElementById('checkButton')

checkButton.addEventListener('click', function () {

    let inputValue = inputVerb.value
    let verbSpanish = verbsSpanish[indexVerb]

    if (inputValue === verbSpanish) {
        showVerb()
        errorVerb.innerText = ''
        acumulationError = 0

        const errorButtons = document.querySelectorAll('.errorButton');
        errorButtons.forEach(button => button.remove());

    } else {
        errorVerb.innerText = 'Ups! no es verbo correcto'
        acumulationError++

        if (acumulationError === 2) {
            const skipButton = document.createElement('button')
            skipButton.classList.add('errorButton')
            skipButton.innerText = 'Saltar'
            skipButton.addEventListener('click', showVerb)


            const hintButton = document.createElement('button')
            hintButton.classList.add('errorButton')
            hintButton.innerText = 'Ayuda'

            document.body.appendChild(skipButton)
            document.body.appendChild(hintButton)
            inputVerb.innerText = ''
        }

    }
})














