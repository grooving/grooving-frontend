<template>
    <div class="container">
            <textarea v-model="log" id="chat-log" class="chat-log" disabled placeholder="Start chatting..."></textarea>
            <input v-model="message" id="chat-message" class="chat-message" type="text" placeholder="Type your message here" @keypress.enter="sendMessage"/>
            <input id="chat-submit" class="chat-submit" type="button" value="Send" @click="sendMessage"/>
    </div>
</template>

<script>

import GSecurity from "@/security/GSecurity.js";
import GChat from "@/utils/GChat.js";

export default {
    
    name: "SimpleChat",

    data: function(){
        return{
            gsecurity: GSecurity,
            gchat: undefined,

            log: '',
            message: '',
        }
    },

    methods:{

        sendMessage: function(){

            if(this.message && this.gchat && this.gsecurity && this.gsecurity.isAuthenticated()){
                
                this.gchat.sendMessage(this.message);
                this.message = "";
            }

        },

        newMessage: function(event){
            let newMessage = this.gchat.processReceivedMessage(event.data);
        
            this.log += newMessage['data']['text'] + "\n";

        }

    },

    mounted(){

        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        let offerId = this.$route.params['offerId'];
        this.gchat = new GChat("ws", offerId, this.gsecurity.getToken(), this.gsecurity.getUsername());
        console.log(this.gchat)

        this.gchat.getWebSocket().addEventListener("message", (event) => {
            this.newMessage(event)
        });
    }

}
</script>

<style scoped>
    
    .chat-log{
        width: 100%;
        height: 10em;
        padding: 10px;
        margin-top: 50px;
    }

    .chat-message{
        width: 100%;
        padding: 10px;
        margin-top: 10px;
    }

    .chat-submit{
        width: 100%;
        padding: 10px;
        margin-top: 10px;
    }

</style>


