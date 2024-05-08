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

let checkButton = document.getElementById('checkButton-verb')

checkButton.addEventListener('click', function () {

    let inputValue = inputVerb.value
    let verbSpanish = verbsSpanish[indexVerb]

    if (inputValue === verbSpanish) {
        showVerb()
        errorVerb.innerText = ''
        acumulationError = 0

        const errorButtons = document.querySelectorAll('.errorButtonVerb');
        errorButtons.forEach(button => button.remove());

    } else {
        errorVerb.innerText = 'Ups! no es verbo correcto'
        acumulationError++

        if (acumulationError === 2) {
            const skipButton = document.createElement('button')
            skipButton.classList.add('errorButtonVerb')
            skipButton.innerText = 'Saltar'
            skipButton.addEventListener('click', showVerb)


            const hintButton = document.createElement('button')
            hintButton.classList.add('errorButtonVerb')
            hintButton.innerText = 'Ayuda'

            document.body.appendChild(skipButton)
            document.body.appendChild(hintButton)
            inputVerb.innerText = ''
        }

    }
})

// Array de verbos en español (Dativo)
const verbosEspanol = ["agradecer", "ayudar", "confiar", "decir", "mostar", "explicar", "gustar", "indicar", "mandar", "mostrar", "ofrecer", "parecer", "pedir", "prestar", "prometer", "regalar", "recordar", "recomendar", "responder", "rogar", "seguir", "servir", "sugerir", "telefonar", "agradar", "interesar", "molestar", "importar", "faltar", "sobrar", "bastar", "quedar", "convenir", "corresponder", "dedicar", "destinar", "satisfacer", "encargar", "designar", "comunicar", "dar", "devolver", "entregar", "enviar", "prestar", "deber", "costar", "venir", "perdonar", "vender"];

// Array de verbos en alemán (Dativo)
const verbosAleman = ["danken", "helfen", "vertrauen", "sagen", "zeigen", "erklären", "gefallen", "anzeigen", "schicken", "zeigen", "anbieten", "scheinen", "bitten", "leihen", "versprechen", "schenken", "erinnern", "empfehlen", "antworten", "bitten", "folgen", "dienen", "vorschlagen", "anrufen", "gefallen", "interessieren", "stören", "wichtig sein", "fehlen", "übrig sein", "genügen", "bleiben", "passen", "entsprechen", "widmen", "bestimmen", "zufriedenstellen", "auftragen", "bestimmen", "mitteilen", "geben", "zurückgeben", "übergeben", "schicken", "leihen", "müssen", "kosten", "kommen", "verzeihen", "verkaufen"];

// Array de verbos en español (Akkusativ)
const verbosEspanolAkk = ["buscar", "encontrar", "ver", "mirar", "leer", "escribir", "comprar", "vender", "tomar", "beber", "comer", "preparar", "cocinar", "llevar", "traer", "pedir", "hacer", "crear", "necesitar", "querer", "amar", "odiar", "sentir", "escuchar", "entender", "preguntar", "invitar", "esperar", "llamar", "aceptar", "rechazar", "buscar", "encontrar", "conocer", "presentar", "entregar", "abrir", "cerrar", "romper", "cambiar", "empezar", "terminar", "olvidar", "recordar", "dejar", "ayudar", "intentar", "lograr", "aprender", "enseñar"];

// Array de verbos en alemán (Akkusativ)
const verbosAlemanAkk = ["suchen", "finden", "sehen", "schauen", "lesen", "schreiben", "kaufen", "verkaufen", "nehmen", "trinken", "essen", "zubereiten", "kochen", "tragen", "bringen", "bestellen", "machen", "schaffen", "brauchen", "wollen", "lieben", "hassen", "fühlen", "hören", "verstehen", "fragen", "einladen", "erwarten", "anrufen", "akzeptieren", "ablehnen", "suchen", "finden", "kennenlernen", "vorstellen", "übergeben", "öffnen", "schließen", "zerbrechen", "wechseln", "beginnen", "beenden", "vergessen", "erinnern", "lassen", "helfen", "versuchen", "erreichen", "lernen", "lehren"];

const completeVerbs = verbosEspanol.concat(verbosEspanolAkk)
const completeGermanVerbs = verbosAleman.concat(verbosAlemanAkk)

let dativOrAkk;
let inputDatAkk = document.querySelector('.dativ-akk')
let inputVerbDativAkk = document.querySelector('.verb-dativ-akk')
let errorDativAkk = document.getElementById('error-dativ-akk')
let acumulationDatAkkError = 0

if (completeGermanVerbs.length <= 49) {
    dativOrAkk = 'D'
} else {
    dativOrAkk = 'A'
}

document.addEventListener('DOMContentLoaded', showDativAkkVerb)

function showDativAkkVerb() {
    indexDativAkk = Math.floor(Math.random() * completeGermanVerbs.length)
    const showedVerb = completeGermanVerbs[indexDativAkk]
    const elementVerb = document.getElementById('showDativAkk')
    elementVerb.innerText = showedVerb
    inputDatAkk.value = ''
    inputVerbDativAkk.value = ''
}

let checkButtonDativ = document.getElementById('checkButton-dativAkk')

checkButtonDativ.addEventListener('click', function () {

    let inputDatAkkValue = inputDatAkk.value
    let inputVerbDativAkkValue = inputVerbDativAkk.value
    let checkDatAkkValue = completeVerbs[indexDativAkk]
    if (inputVerbDativAkkValue === checkDatAkkValue && inputDatAkkValue === dativOrAkk) {
        showDativAkkVerb()
        errorDativAkk.innerText = ''
        acumulationDatAkkError = 0

        const errorDativAkkButtons = document.querySelectorAll('.errorDativAkk')
        errorDativAkkButtons.forEach(button => button.remove());
    } else {
        errorDativAkk.innerText = 'Ups! no es verbo correcto'
        acumulationDatAkkError++

        if (acumulationDatAkkError === 2) {
            const skipButton = document.createElement('button')
            skipButton.classList.add('errorButtonDatAkk')
            skipButton.innerText = 'Saltar'
            skipButton.addEventListener('click', showVerb)


            const hintButton = document.createElement('button')
            hintButton.classList.add('errorButtonDatAkk')
            hintButton.innerText = 'Ayuda'

            document.body.appendChild(skipButton)
            document.body.appendChild(hintButton)
            inputDatAkk.innerText = ''
            inputVerbDativAkk.innerText = ''
        }
    }
})
















