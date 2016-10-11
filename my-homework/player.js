export class Player{
    constructor(data){
        this._roles = data.roles;
        this._isAlive = data.isAlive;
        this._coordinates = data.coordinates;
    }

    get isAlive(){return this._isAlive === undefined ? true : this._isAlive;}
    get coordinates(){return this._coordinates;}

    plantBomb(bomb, place){
        if(!this.canPlantBomb){
            return false;
        }
        if(place && !place.inZone(this.coordinates)){
            return false;
        }

        return !!bomb.plant();
    }

    canPlantBomb(){
        return this.isInRole("Terrorist") && this.isAlive;
    }

    isInRole(role){
        return this._roles.find(x => x === role) !== undefined;
    }

    isWinner(bombIsDefused){
        if(this.isInRole("Special Force") && bombIsDefused){
            return true;
        }

        return !!(this.isInRole("Terrorist") && !bombIsDefused);
    }
}