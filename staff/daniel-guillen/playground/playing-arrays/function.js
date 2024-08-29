var nums = [1, 2, 3, 4, 5, 6, 7]

function reverse(nums) {
    
    var reverseNums = nums.reverse()
    alert(" Ahora:" + reverseNums);
}

var animals = ['elephant', 'koala', 'kangaroo', 'chimpanzee', 'gorilla']

function filterAnimalsByLetter(a) {
    var animalsWithLetter = [];
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].includes(a)) {
            animalsWithLetter.push(animals[i]);
        }
    }
    alert(animalsWithLetter);
}

function withA() {
    var animalsWithA = [];
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].includes('a')) {
            animalsWithA.push(animals[i]);
        }
    }
    alert(animalsWithA);
}

function withE() {
    var animalsWithE = [];
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].includes('e')) {
            animalsWithE.push(animals[i]);
        }
    }
    alert(animalsWithE);
}

function withI() {
    var animalsWithI = [];
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].includes('i')) {
            animalsWithI.push(animals[i]);
        }
    }
    alert(animalsWithI);
}

function withO() {
    var animalsWithO = [];
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].includes('o')) {
            animalsWithO.push(animals[i]);
        }
    }
    alert(animalsWithO);
}

function hoyEs() {
    var hoy = new Date ();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    hoy = dd + '/' + mm + '/' + yyyy;

    alert(hoy);
}

var animalss = [];

function pushAnimals(element) {
    animalss.push(element);
    
    alert("Si tienes sueño cuenta ovejas: " + animalss.length + ': ' + animalss);
}

function popAnimals(element) {
    animalss.pop(element);
    if (animalss.length >= 1){
        alert("Me como una oveja, aún me quedan: " + animalss.length + ': ' + animalss);
    }
    else {
        alert("Cuenta mas ovejas para seguir comiendo");
    }

}


function inserso(age, widowed) {
    if (age >= 60) {
        alert("Te puedes apuntar al inserso");
    } else {
        if (age >= 55 && widowed === "si") {
            alert("Te puedes apuntar al inserso");
        } else {
            alert("No puedes apuntarte al inserso");
        }
    }
}

function checkInserso() {
    var checkbox = document.getElementById("checkboxWidowed");
    var checkboxWidowed = checkbox.checked ? checkbox.value : null;
    return checkboxWidowed;
}

function inserso2(age, checkboxWidowed) {
    if (age >= 60) {
        alert("Te puedes apuntar al inserso");
    } else {
        if (age >= 55 && checkboxWidowed === "si") {
            alert("Te puedes apuntar al inserso");
        } else {
            alert("No puedes apuntarte al inserso");
        }
    }
}

