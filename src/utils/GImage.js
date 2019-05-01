const IMAGES_TYPES = ['PROFILE', 'BANNER', 'CAROUSEL'];
const BASE64_PREFIX = 'data:image/';

class GImage{

    constructor(image64Data, type, oldURL=undefined){

        if(!this.checkImage64Data(image64Data))
            throw "Illegal Base64 Image"
        
        if(!this.checkType(type))
            throw "Illegal Image Type"

        this._image64Data = image64Data;
        this._oldURL = oldURL;
        this._type = type;

    }

    getImage64Data(){
        return this._image64Data;
    }

    getOldURL(){
        return this._oldURL;
    }

    getExtension(){

        let res = undefined;

        if(this._image64Data){
            let beginIndex = BASE64_PREFIX.length;
            let lastIndex = this._image64Data.indexOf(';');
            
            if(lastIndex < this._image64Data.length){
                res = this._image64Data.substr(beginIndex, (lastIndex-beginIndex));
            }
            
        }

        return res;
    }

    getType(){
        return this._type;
    }

    setImage64Data(image64Data){
        if(this.checkImage64Data(image64Data))
            this._image64Data = image64Data;
    }

    setOldURL(oldURL){
        this._oldURL = oldURL;
    }

    setType(type){
        if(this.checkType(type))
            this._type = type;
    }

    // Business Methods

    getRequestBody(){

        let res = {
            imgData: this.getImage64Data(),
            imgExtension: this.getExtension(),
            type: this.getType(),        
        }

        let oldURL = this.getOldURL();
        if(oldURL)
            res['oldURL'] = oldURL;

        return res;
    }

    // Auxiliary Methods
    checkImage64Data(image64Data){
        let res = false;
        
        if(image64Data && typeof image64Data == 'string' && image64Data.startsWith(BASE64_PREFIX))
            res = true;

        return res;
    }

    checkType(type){
        let res = false;

        if(type && IMAGES_TYPES.includes(type))
            res = true;

        return res;
    }

}

export default GImage;
