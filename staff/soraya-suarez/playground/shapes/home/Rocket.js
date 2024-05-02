class Rocket extends Shape {
    constructor() {
        super();

        const body = new Shape();
        body.setColor('blue');
        body.setHeight(80);
        body.setWidth(46);
        body.setRadiusMultiple(50, 50, 0, 0);
        
        this.add(body);

        const window = new Shape();
        window.setColor('white');
        window.setHeight(20);
        window.setWidth(20);
        window.setRadius(50);
        window.moveY(10);
        window.moveX(10);
        window.setBorder(3, 'solid','black');

        this.add(window);

        const footL = new Shape();
        footL.moveX(-50);
        footL.moveY(25);
        footL.setBorderLeft(50, 'solid', 'black');
        footL.setBorderRight(50, 'solid', 'transparent');
        footL.setBorderTop(50, 'solid', 'transparent');
        footL.setBorderBottom(50, 'solid', 'black');
        footL.setTransform('rotate', 45);
        footL.setTransform('scale', 0.4);
        this.add(footL);

        const footR = new Shape();
        footR.moveX(-4);
        footR.moveY(25);
        footR.setBorderLeft(50, 'solid', 'transparent');
        footR.setBorderRight(50, 'solid', 'black');
        footR.setBorderTop(50, 'solid', 'transparent');
        footR.setBorderBottom(50, 'solid', 'black');
        footR.setTransform('rotate', -45);
        footR.setTransform('scale', 0.4);
        this.add(footR)

        const fire = new Shape();
        fire.moveY(75);
        fire.setWidth(50);
        fire.setHeight(50);
        fire.setColor('#ec6302');
        fire.setRadiusMultiple(20, 20, 50, 50);
        fire.setBoxShadow(0, 0, 10, 5, '#ec6302');
        this.add(fire);

        const fire1 = new Shape();
        fire1.moveY(75);
        fire1.moveX(5);
        fire1.setWidth(35);
        fire1.setHeight(35);
        fire1.setColor('#ff7d04');
        fire1.setRadiusMultiple(20, 20, 50, 50);
        fire1.setBoxShadow(0, 0, 9, 4, '#ff7d04');
        this.add(fire1);

        const fire2 = new Shape();
        fire2.moveY(75);
        fire2.moveX(8);
        fire2.setWidth(35);
        fire2.setHeight(35);
        fire2.setColor('#ffbf00');
        fire2.setRadiusMultiple(20, 20, 50, 50);
        fire2.setBoxShadow(0, 0, 9, 4, '#ffbf00');
        this.add(fire2);
    }
}