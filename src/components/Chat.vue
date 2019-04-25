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

export default {

  name: 'Chat',

  data() {
    return {

      gsecurity: GSecurity,
      gchat: undefined,

      // ---- Vue Beautiful Chat Properties -----

      // List of all the participant of the conversation.
      //'name' is the user name, 
      //'id' is used to establish the author of a message, 
      //'imageUrl' is supposed to be the user avatar.
      participants: [
        {
          id: 'rosalia',
          name: 'Rosalía',
          //imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
      ], 

      // The image displayed on the chat header
      titleImageUrl: 'https://img.europapress.es/fotoweb/fotonoticia_20181107115306_1920.jpg',

      // List of the messages to show, can be paginated and adjusted dynamically
      messageList: [
          { type: 'text', author: 'me', data: { text: 'Mensaje tela de largo para que haya varias líneas y se vea que está roto.', time: '17:21' } },
          { type: 'text', author: 'rosalia', data: { text: 'Hola.', time: '19:26'  } },
          { type: 'text', author: 'rosalia', data: { text: 'Este mensaje tiene muchas palabras y por eso tiene más de 1 línea.', time: '19:26'  } },
          { type: 'text', author: 'me', data: { text: 'Ok', time: '17:21' } }
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
      alwaysScrollToBottom: false, 

      // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      messageStyling: true ,
    }
  },

  methods: {

    sendMessage (text) {
      console.log('wigg')
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.gchat.sendMessage(text);
      }
    },

    incomingMessage: function(event){
      let newMessage = this.gchat.processReceivedMessage(event.data);
      this.appendMessage(newMessage);
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

  mounted(){

    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();

    let offerId = '1';
    this.gchat = new GChat("ws", offerId, this.gsecurity.getToken(), this.gsecurity.getUsername());
    console.log(this.gchat)

    this.gchat.getWebSocket().addEventListener("message", (event) => {
        this.incomingMessage(event);
    });

  }
}
</script>

<style scoped>

</style>
