
// Server socket
const HOST_URI = 'localhost:8000';

// Both normal and secure forms
const SUPPORTED_PROTOCOLS = ['ws', 'wss']

class GChat{
    
    constructor(protocol, room){

        if(this.checkProtocol(protocol) && this.checkRoom(room)){

            this._protocol = protocol.toLowerCase();
            this._room = room;
            this._webSocket = undefined;
            this.createSocket();

        }else{
            throw "Gchat: Required properties are not correct";
        }

    }

    // Getters & Setters

    getProtocol(){
        return this._protocol;
    }

    getRoom(){
        return this._room;
    }

    getWebSocket(){
        return this._webSocket;
    }

    getURI(){
        return this.getProtocol() + "://" + HOST_URI + '/chat/' + this.getRoom() + "/";
    }

    // Functionalities
    processReceivedMessage(rawResponse){

        var res;

        try{

            var receivedMessage = JSON.parse(rawResponse)['json'];
            var mode = receivedMessage['mode'];

            if(mode == "ERROR"){
                res = receivedMessage['error'];
            }else if (mode == "DATE"){
                console.log('DATE_MODE is still under development...')
                res = receivedMessage['date'];
            }else if(mode == 'MESSAGE'){
                res = "@" + receivedMessage["username"] + " - " + receivedMessage["name"] + " - "  + receivedMessage["hour"] + ": " + receivedMessage["message"]
            }else{
                res = 'Incorrect message format';
            }

        } catch(error){

            console.log("Error while processing a received message");
            console.log(error);

            res = 'Unexpected error. Try Again later';

        }

        return res;
    }

    // Send Message

    /*
        Sends a new message over an open socket.
        Message can either be a string or a serilizable
        object (using JSONParser)

        Returns: Whether the message was enqueued to be delivered or not
    */
    sendMessage(message){

        var res = false;

        // Check if the WebSocket is open
        if(this.getWebSocket().readyState == 1){

            // Check message type

            if(typeof message === 'object'){

                // If it's an object, we need to parse it
                let formattedMessage = JSON.stringify(message);
                
                this.getWebSocket().send(formattedMessage);
                res = true;

            }else if(typeof message === 'string'){

                // Directly send the string
                this.getWebSocket().send(message);
                res = true;

            }else{
                console.log("Attempted to send a non-supported type of message: ", typeof message)
            }

        }else{
            console.log("Attempted to send a message over a closed socket")
        }

        return res;
    }

    // Auxiliary methods

    createSocket(){

        this._webSocket = new WebSocket(this.getURI());

        // ---- CUSTOM EVENTS LISTENERS -----
         /*
        this._webSocket.addEventListener("open", () => {

            let message = {
                'token': "df007880db9a4f4fdc61728b5a86aa4786320cc2", //Token del usuario logeado
                'message': "just"
            };

            this.sendMessage(message);

        });

        this._webSocket.addEventListener('message', (event) => {
            var message = this.processReceivedMessage(event.data)
            console.log("Processed Message: ", message)
        });
        
        this._webSocket.addEventListener('close', () => {
            console.log("WebSocket connection closed")
        });
        */

    }

    /*
        Checks whether a protocol parameter
        is correct or not
    */
    checkProtocol(protocol){
        var res = false;

        if(protocol && typeof protocol === 'string' && 
        SUPPORTED_PROTOCOLS.includes(protocol.toLowerCase())){
            res = true;
        }

        return res;
    }

    /*
        Checks whether a room parameter
        is correct or not
    */
    checkRoom(room){
        var res = false;

        if(room && typeof room === 'string')
            res = true;
        
        return res;
    }

}

export default GChat;