if (!logic.isUserLoggedIn())
    location.href = '../login';

const view = new Component(document.body);
view.addClass('View');

const userName = logic.getUserName();

const usernameTitle = new Heading(3);
usernameTitle.setText(userName);

view.add(usernameTitle);

let actualScore = 0;
let actualScoreTitle = new Heading(3);
actualScoreTitle.setText('SCORE ' + actualScore);
view.add(actualScoreTitle);

const logoutButton = new Button;
logoutButton.setText('Logout');

logoutButton.onClick(() => {
    logic.logoutUser();
    location.href = '../login';
})

view.add(logoutButton);

const rocket = new Rocket();
rocket.config('ArrowLeft', 'ArrowRight');
rocket.move(window.innerWidth/2-20, window.innerHeight-132, 0);

const ufo = new Ufo();
ufo.move(-50, -50, 0);

const ufo1 = new Ufo();
ufo1.move(-50, -50, 0);

const ufo2 = new Ufo();
ufo2.move(-50, -50, 0);

const ufo3 = new Ufo();
ufo3.move(-50, -50, 0);

const step = 10;

const doc = new Component(document);

function game() {
    ufo.moveX((Math.random() * ((window.innerWidth - 70) - 50 + 1)) + 50);
    ufo.moveYConstantly(40);

    doc.onKeyDown(event => {
        const key = event.key.toLowerCase();
        
        if (key === rocket.keyLeft.toLowerCase()) {
            rocket.moveRelativeX(-step);
        } else if (key === rocket.keyRight.toLowerCase()) {
            rocket.moveRelativeX(step);
        }

        //Intentar hacerlo con los bordes de la caja la colisión

        //Height máximo rocket aprox 100
        //Widht máximo rocket aprox 50

        //Height máximo ufo aprox 45
        //Widht máximo ufo aprox 60
        /*if ((rocket.getX() + 50) === (ufo.getX() + 60) ||  (rocket.getX() + 50) === (ufo.getX() + 60) || 
            rocket.getY() === ufo.getY()) {
            console.log("Colisión");
        }*/

        //El lado izquierdo de rocket se encuentra con el lado derecho de ufo
        //El lado derecho de rocket se encuentra con el lado izquierdo de ufo
        //
        /*if ((rocket.getX() - 50) === (ufo.getX() + 60) && (rocket.getX() + 50) === (ufo.getX() - 60) && (rocket.getY() + 45) >= (ufo.getY() + 50)) {
            console.log("Colisión");
        }*/

        console.log('Pos X del cohete: ', rocket.getX());
        console.log('Pos Y del cohete: ',rocket.getY());
        console.log('Pos X del ufo: ',ufo.getX());
        console.log('Pos Y del ufo: ', ufo.getY());
    })
}
document.body.style.background = 'url(https://i.pinimg.com/originals/c6/66/e3/c666e308d4f44faf134bd0e2c0f9e785.jpg) no-repeat center fixed';

view.add(rocket);
view.add(ufo);
view.add(ufo1);
view.add(ufo2);
view.add(ufo3);

game();