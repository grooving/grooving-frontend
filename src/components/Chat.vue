<template>
    <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="sendButtonPressed"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      @onType="handleOnType" />
  </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js";
import GChat from "@/utils/GChat.js";
import GAxios from "@/utils/GAxios.js";
import endpoints from "@/utils/endpoints.js";

export default {

  name: 'Chat',

  data() {
    return {

      gsecurity: GSecurity,
      gchat: undefined,
      offerId: '1',

      // ---- Vue Beautiful Chat Properties -----

      // List of all the participant of the conversation.
      //'name' is the user name, 
      //'id' is used to establish the author of a message, 
      //'imageUrl' is supposed to be the user avatar.
      participants: [
        {
          id: '',
          name: '',
          //imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
      ], 

      // The image displayed on the chat header
      titleImageUrl: require('@/assets/defaultPhoto.png'),

      // List of the messages to show, can be paginated and adjusted dynamically
      messageList: [
          { type: 'text', author: 'server', data: { text: 'Loading messages...', time: '00:00' } },
      ], 

      // For notification purporses
      newMessagesCount: 0,

      // To determine whether the chat window should be open or closed
      isChatOpen: false, 

      // When set to a value matching the participant.id it shows the typing indicator for the specific user
      showTypingIndicator: '', 

      // specifies the color scheme for the component
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      },

      // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...) 
      alwaysScrollToBottom: true, 

      // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      messageStyling: true ,
    }
  },

  methods: {

    sendMessage (text) {
      if (text.length > 0 && this.gchat) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.gchat.sendMessage(text);
      }
    },

    incomingMessage: function(event){
      if(this.gchat){
        let newMessage = this.gchat.processReceivedMessage(event.data);
        this.appendMessage(newMessage);
      }
    },

    appendMessage(message){
      this.messageList = [ ...this.messageList, message ]
    },

    // ---- Vue Beautiful Chat Methods
    sendButtonPressed (message) {
      // This method is called whenever the user press 'Send'
      this.sendMessage(message['data']['text']);
    },

    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },

    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },

    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    
    handleOnType () {
      console.log('Emit typing event')
    },

  },

  beforeMount(){

    //BORRAR
    this.offerId = '1';
    
    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();
    this.gchat = new GChat("ws", this.offerId, this.gsecurity.getToken(), this.gsecurity.getUsername());

    this.gchat.getWebSocket().addEventListener("message", (event) => {
        this.incomingMessage(event);
    });

    // Retrieve the conversation
    var authorizedGAxios = GAxios;

    authorizedGAxios.get(endpoints.chat + this.offerId + '/').then(response =>{
      
      if(this.gsecurity.hasRole('ARTIST')){
        this.titleImageUrl = response.data.customerPhoto;
        this.participants[0].id = response.data.customerUsername;
        this.participants[0].name = response.data.customerName;
      }else{
        this.titleImageUrl = response.data.artistPhoto;
        this.participants[0].id = response.data.artistUsername;
        this.participants[0].name = response.data.artistName;
      }

      //If the user has no foto, we change id with the predefined one
      if(!this.titleImageUrl) 
        this.titleImageUrl = require('@/assets/defaultPhoto.png');

      var messages = response.data.messages;
      var history = [];

      for(var i = 0; i < messages.length; i++){

        var m = messages[i].json;
        history.push(this.gchat.formatVueChatMessage(m.username, m.message, m.hour));
      }

      this.messageList = history;

    });

  },
}
</script>

<style scoped>

</style>
