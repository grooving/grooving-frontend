import endpoints from '../utils/endpoints.js';
import GAxios from '../utils/GAxios.js'

const ROLES = ['ANONYMOUS', 'ARTIST', 'CUSTOMER', 'ADMIN'];
const AUTH_ROLES = ['ARTIST', 'CUSTOMER', 'ADMIN'];
const UNAUTH_ROLES = ['ANONYMOUS'];
const SUPPORTED_LANGUAGES = ['en', 'es']

class GSecurity {

    constructor(username = 'ANONYMOUS', role='ANONYMOUS', token='', id=-1, firstName='ANONYMOUS', photo='', language='en'){
      
      this._username = username;
      this._firstName = firstName;
      this._role = 'ANONYMOUS'
      this._token = '';
      this._photo = '';
      this._id = -1;
      
      if(role && AUTH_ROLES.includes(role.toUpperCase()) && token && id != undefined && id != null && id >= 0){
        this._role = role.toUpperCase();
        this._token = token;
        this._photo = photo;
        this._id = id;
      }

      if(language && SUPPORTED_LANGUAGES.includes(language.toLowerCase()))
        this._language = 'en';        

    }

    // Getters
    getUsername(){
        return this._username;
    }

    getId(){
        return this._id;
    }

    getRole(){
        return this._role;
    }

    getPhoto() {
        return this._photo;
    }

    getFirstName() {
        return this._firstName;
    }

    getToken() {
        return this._token;
    }

    getLanguage(){
        return this._language;
    }

    // Setters
    setUsername(username){
        if(typeof username === 'string')
            this._username = username;
    }

    setId(id){
        if(Number(id) >= -1)
            this._id = id;
    }

    setRole(role){
        if(typeof role === 'string' && role && ROLES.includes(role.toUpperCase())){
            this._role = role.toUpperCase();
        }
    }

    setPhoto(photo){
        if(typeof photo === 'string' && photo)
            this._photo = photo;
        else
            this._photo = ''; 
    }

    setFirstName(firstName){
        if(typeof firstName === 'string' && firstName)
            this._firstName = firstName;
    }

    setToken(token){
        if(typeof token === 'string' && token)
            this._token = token;
    }

    setLanguage(language){
        if(language && SUPPORTED_LANGUAGES.includes(language.toLowerCase()))
            this._language = language.toLowerCase();
    }

    // Other Business Methods
    obtainSavedCredentials(){
        if(localStorage.getItem('token')){
            // There are items in session to be restored...
            this.setToken(localStorage.getItem("token"));
            this.setUsername(localStorage.getItem("username"));
            this.setFirstName(localStorage.getItem("firstName"));
            this.setRole(localStorage.getItem("role"));
            this.setPhoto(localStorage.getItem("photo"));
            this.setId(localStorage.getItem("id"));

            this.setLanguage(localStorage.getItem("language"));
        }
    }

    saveCredentialsInCache(){
        window.localStorage.setItem("username", this.getUsername());
        window.localStorage.setItem("role", this.getRole());
        window.localStorage.setItem("id", this.getId());
        window.localStorage.setItem("photo", this.getPhoto());
        window.localStorage.setItem("firstName", this.getFirstName());
        window.localStorage.setItem("token", this.getToken());
        window.localStorage.setItem("language", this.getLanguage());
    }

    deleteCredentialsInCache(){
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("id");
        window.localStorage.removeItem("photo");
        window.localStorage.removeItem("firstName");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("language");
    }
  
    async authenticate(username, password){

        var res = false;

        if(username && password){
            await GAxios.post(endpoints.login, {
                "username": username,
                "password": password
              }).then(response => {
                
                    console.log(response)

                    let isArtist = response.data.artist ? true : false;
                    let token = response.headers['x-auth'];
                    let id = isArtist ? response.data.artist.id : response.data.customer.id;
                    let role = isArtist ? 'ARTIST' : 'CUSTOMER';
                    let photo = isArtist ? response.data.artist.photo : response.data.customer.photo;
                    let userName = isArtist ? response.data.artist.user.username : response.data.customer.user.username;
                    let firstName = isArtist ? response.data.artist.user.first_name : response.data.customer.user.first_name;
                    let language = 'es';
                    console.log("AUTO SET DE IDIOMA; CAMBIAR")

                    if(token && id && role && userName && firstName){
                        this.setToken(token);
                        this.setId(id);
                        this.setRole(role);
                        this.setPhoto(photo);
                        this.setUsername(userName);
                        this.setFirstName(firstName);
                        this.setLanguage(language);

                        this.saveCredentialsInCache();
                        res = true;
                    }else{
                        this.deleteCredentialsInCache();
                        res = false;
                    }
    
                  }).catch(ex => {
                    res = false;
                  });
        }

        return res;
    }

    async sudoAuthenticate(username, password){

        var res = false;

        if(username && password){
            await GAxios.post(endpoints.adminLogin, {
                "username": username,
                "password": password
              }).then(response => {
                
                    console.log(response)

                    if(response.data.admin){

                        let token = response.headers['x-auth'];
                        let id = response.data.admin.id;
                        let role = 'ADMIN';
                        let photo = 'http://thesource.com/wp-content/uploads/2015/11/CharliXCX_022315.jpg';
                        let userName = response.data.admin.user.username;
                        let firstName = response.data.admin.user.first_name;
                        let language = 'es';
                        console.log("AUTO SET DE IDIOMA; CAMBIAR")

                        if(token && id && role ){
                            this.setToken(token);
                            this.setId(id);
                            this.setRole(role);
                            this.setPhoto(photo);
                            this.setUsername(userName);
                            this.setFirstName(firstName);
                            this.setLanguage(language);

                            this.saveCredentialsInCache();
                            res = true;
                        }else{
                            this.deleteCredentialsInCache();
                            res = false;
                        }

                    }else{
                        this.deleteCredentialsInCache();
                        res = false;
                    }
    
                  }).catch(ex => {
                    res = false;
                  });
        }
        console.log(res)
        return res;
    }

    deauthenticate(){

        this.setUsername('ANONYMOUS')
        this.setRole('ANONYMOUS');
        this.setToken('');
        this.setFirstName('');
        this.setId(-1);
        this.setPhoto('');
        this.setLanguage('en');

        this.deleteCredentialsInCache();
    }

    isAuthenticated(){
        if(this.getToken())
            return true;
    }

    isAnonymous(){
        return !this.getToken() ? true : false;
    }
    
    hasRole(role){

        if(role && ROLES.includes(role.toUpperCase()))
            return this.getRole() === role.toUpperCase();
        else
            return false;
    }

  }
  
  const instance = new GSecurity();
  export default instance;