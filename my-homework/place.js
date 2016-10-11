export class Place{

    constructor(data) {
        this._isForPlant = data.isForPlant;
        this._location = data.location;
    }

    get isForPlant(){return !!this._isForPlant;}

    get location(){return new Location(this._location);}

    inZone(coordinates){
        return this.location.inZone(coordinates);
    }
}

class Location{

    constructor(data) {
        this._x = data.x;
        this._y = data.y;
        this._width = data.width;
        this._height = data.height;
    }

    get x(){return this._x;}
    get y(){return this._y;}
    get width(){return this._width;}
    get height(){return this._height;}

    get maxY(){return this.y + this.height;}
    get maxX(){return this.x + this.width;}

    inZone(coordinates) {
        return !!(this.maxX >= coordinates.x && this.x <= coordinates.x && this.maxY >= coordinates.y && this.y <= coordinates.y);
    }
}