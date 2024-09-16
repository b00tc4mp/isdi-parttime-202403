class Ufo extends Shape{
    constructor() {
        super();

        const crystal = new Shape();
        crystal.setHeight(45);
        crystal.setWidth(30);
        crystal.setColor('#EBF5FB');
        crystal.setRadiusMultiple(50, 50, 0, 0);

        this.add(crystal);

        const body = new Shape();
        body.setHeight(23);
        body.setWidth(60);
        body.setRadius(50);
        body.setColor('#546E7A');
        body.moveX(-15);
        body.moveY(26);

        this.add(body);

        const light = new Shape();
        light.setHeight(8);
        light.setWidth(8);
        light.setRadius(50);
        light.setColor('#FFF176');
        light.moveX(-8);
        light.moveY(33);

        this.add(light);

        const light1 = new Shape();
        light1.setHeight(8);
        light1.setWidth(8);
        light1.setRadius(50);
        light1.setColor('#FFF176');
        light1.moveX(5);
        light1.moveY(33);

        this.add(light1);

        const light2 = new Shape();
        light2.setHeight(8);
        light2.setWidth(8);
        light2.setRadius(50);
        light2.setColor('#FFF176');
        light2.moveX(18);
        light2.moveY(33);

        this.add(light2);

        const light3 = new Shape();
        light3.setHeight(8);
        light3.setWidth(8);
        light3.setRadius(50);
        light3.setColor('#FFF176');
        light3.moveX(31);
        light3.moveY(33);

        this.add(light3);
    }
}