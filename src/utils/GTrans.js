import es from '../i18n-l10n/es.js';
import en from '../i18n-l10n/en.js';

const SUPPORTED_LANGUAGES = ['en', 'es']

class GTrans {

    constructor(language = 'en'){

        if(language && SUPPORTED_LANGUAGES.includes(language.toLowerCase()))
            this._language = language.toLowerCase();
    }

    // Getters
    getLanguage(){
        return this._language;
    }

    // Setters
    setLanguage(language){
        if(language && SUPPORTED_LANGUAGES.includes(language.toLowerCase()))
            this._language = language.toLowerCase();
    }

    // Other Methods
    translate(keyword){

        var res = "KEYWORD IS UNDEFINED";

        if(keyword){

            if(this.getLanguage() == 'en'){

                res = en[keyword];

            }else if(this.getLanguage() == 'es'){

                res = es[keyword];

            }

            if(!res)
                res = "INCORRECT KEYWORD"

        }

        return res;

    }

  }
  
  export default GTrans;