export class Bomb{
    constructor() {
        this._isDefused = false;
        this._isPlanted = false;
    }

    defuse(){
        this._isDefused = true;
    }

    plant(){
        if(this.isPlanted){
            return false;
        }else{
            this.isPlanted = true;
            return true;
        }
    }

    get isDefused(){return this._isDefused;}

    get isPlanted(){return this._isPlanted;}
    set isPlanted(value){return this._isPlanted = value;}
}