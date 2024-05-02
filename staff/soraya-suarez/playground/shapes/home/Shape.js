class Shape extends Component {
    constructor() {
        super();
        this.container.style.position = 'absolute';
        this.move(0, 0, 0);
    }

    setHeight(height) {
        this.height = height;
        this.container.style.height = height + 'px';
    }

    setWidth(width) {
        this.width = width;
        this.container.style.width = width + 'px';
    }

    setRadius(radius) {
        this.container.style.borderRadius = radius + '%';
    }

    setRadiusMultiple(topLeft, topRight, bottomRight, bottomLeft) {
        this.container.style.borderRadius = topLeft + '%' + ' ' + topRight + '%' + ' ' + bottomRight + '%' + ' ' + bottomLeft + '%';
    }

    setBorder(value, style, color) {
        this.container.style.border = value + 'px' + ' ' + style + ' ' + color;
    }

    setBorderLeft(border, style, color) {
        this.container.style.borderLeft = border + 'px' + ' ' + style + ' ' + color ;
    }

    setBorderRight(border, style, color) {
        this.container.style.borderRight = border + 'px' + ' ' + style + ' ' + color ;
    }

    setBorderTop(border, style, color) {
        this.container.style.borderTop = border + 'px' + ' ' + style + ' ' + color ;
    }

    setBorderBottom(border, style, color) {
        this.container.style.borderBottom = border + 'px' + ' ' + style + ' ' + color ;
    }

    setColor(color) {
        this.container.style.backgroundColor = color;
    }

    setTransform(type, value) {
        if (type === 'rotate') {
            this.container.style.transform += 'rotate(' + value + 'deg)';
        } else if (type === 'scale') {
            this.container.style.transform += 'scale(' + value;
        }
    }

    setBoxShadow(offsetX, offsetY, blurRadius, spreadRadius, color) {
        this.container.style.boxShadow = offsetX + 'px' + ' ' + offsetY + 'px' + ' ' + blurRadius + 'px' + ' ' + spreadRadius + 'px' + ' ' + color;
    }

    getX() {
        return this.container.style.left;
    }

    getY() {
        return this.container.style.top;
    }

    moveX(x) {
        this.x = x;
        this.container.style.left = x + 'px';
    }

    moveY(y) {
        this.y = y;
        this.container.style.top = y + 'px';
    }

    moveZ(z) {
        this.z = z;
        this.container.style.transform = 'scale(' + (z + 100) / 100 +')';
    }

    move(x, y, z) {
        this.moveX(x);
        this.moveY(y);
        this.moveZ(z);
    }

    moveRelativeX(dx) {
        this.x += dx;
        if ((this.x + 70) <= window.innerWidth && (this.x -20)>0) {
            this.container.style.left = this.x + 'px';
        } else {
            this.x -= dx;
        }
    }

    moveRelativeY(dy) {
        this.y = dy;
        this.container.style.top = this.y + 'px';
    }

    moveRelativeZ(dz) {
        this.z = dz;
        this.container.style.transform = 'scale (' + (this.z + 100) / 100 + ')';
    }

    moveRelative(dx, dy, dz) {
        this.moveRelativeX(dx);
        this.moveRelativeY(dy);
        this.moveRelativeZ(dz);
    }

    config(keyLeft, keyRight) {
        this.keyLeft = keyLeft;
        this.keyRight = keyRight;
    }
}