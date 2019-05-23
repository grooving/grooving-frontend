
// Server socket
const HOST_URI = 'groovy-fupload-test.herokuapp.com';

// Both normal and secure forms
const SUPPORTED_PROTOCOLS = ['ws', 'wss']

class GChat{
    
    constructor(protocol, room, userToken, userName){

        if(this.checkProtocol(protocol) && this.checkRoom(room) && userToken && userName){

            this._protocol = protocol.toLowerCase();
            this._room = room;
            this._webSocket = undefined;
            this._userToken = userToken;
            this._userName = userName;
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

    getUserToken(){
        return this._userToken;
    }

    getUserName(){
        return this._userName;
    }

    getURI(){
        return this.getProtocol() + "://" + HOST_URI + '/chat/' + this.getRoom() + "/";
    }

    // Functionalities
    processReceivedMessage(rawResponse){

        var res;

        try{

            var receivedMessage = JSON.parse(rawResponse)['json'];
            console.log("Parsed Received Message: ", receivedMessage);

            var mode = receivedMessage['mode'];

            if(mode == "ERROR"){

                res = this.formatVueChatMessage('server', receivedMessage["error"]);

            }else if(mode == 'MESSAGE'){

                res = this.formatVueChatMessage(receivedMessage["username"], receivedMessage["message"], receivedMessage["hour"]);

            }else{

                res = 'Incorrect message format';

            }

        } catch(error){

            console.log("Error while processing a received message");
            console.log(error);

            res = this.formatVueChatMessage('server', 'Unexpected error. Try Again later');

        }

        return res;
    }

    // Send Message

    /*
        Sends a new textMessage over an open socket.

        Returns: Whether the message was enqueued to be delivered or not
    */
    sendMessage(textMessage){

        var res = false;

        // Check if the WebSocket is open
        if(this.getWebSocket().readyState == 1){

            // Check message type
            if(typeof textMessage === 'string'){

                // Create an object containing the text message and the 
                // user token
                let message = JSON.stringify({
                    "token": this.getUserToken(),
                    "message" : textMessage,
                });

                this.getWebSocket().send(message);
                res = true;

            }else{
                console.log("Attempted to send a non-supported type of message: ", typeof textMessage)
            }

        }else{
            console.log("Attempted to send a message over a closed socket")
        }

        return res;
    }

    // Auxiliary methods

    /*
        Returns a representation of a message
        following Vue Component's style.
    */
    formatVueChatMessage(author, messageText, messageTime){

        // Can't create a constant as values
        // are copied using references
        let res = {
            author : this.getUserName() == author ? 'me' : author,
            type: 'text',
            data: {
                text: messageText ? messageText : '',
                time: messageTime,
            },
        }

        return res;
    }

    createSocket(){

        let initMessage = {
            "token" : this.getUserToken()
        }

        this._webSocket = new WebSocket(this.getURI());
        this._webSocket.addEventListener("open", () => {

            console.log("WS was opened: ", this._webSocket)
            this._webSocket.send(JSON.stringify(initMessage));

        });

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
