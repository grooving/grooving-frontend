<template>
  <div id="chat">
    <div >
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
      :placeholder="placeholder"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      :isActive= "isActive"
      @onType="handleOnType" />
  </div>
  </div>
</template>

<script>
import GSecurity from "@/security/GSecurity.js";
import GChat from "@/utils/GChat.js";
import GAxios from "@/utils/GAxios.js";
import endpoints from "@/utils/endpoints.js";
import GTrans from "@/utils/GTrans.js";

const CONNECTION_RETRIALS = 2; 

export default {

  name: 'Chat',

  data() {
    return {

      // Utils
      gsecurity: GSecurity,
      gchat: undefined,
      gtrans: undefined,

      // View Specific Properties
      chatProtocol: undefined,
      chatErrorCount: 0,
      chatClosingCount: 0,
      placeholder: undefined,

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
      messageList: [], 

      // For notification purporses
      newMessagesCount: 0,

      // To determine whether the chat window should be open or closed
      isChatOpen: true, 

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

  computed:{

    isActive: function(){
      return this.chatActive && this.chatErrorCount == 0;
    }

  },

  methods: {

    safelyCreateChatInstance: function(){
      while(this.chatErrorCount < CONNECTION_RETRIALS && this.chatClosingCount < CONNECTION_RETRIALS){

        try {
          this.gchat = new GChat(this.protocol, this.offerId.toString(), this.gsecurity.getToken(), this.gsecurity.getUsername());
          console.log(this.chatErrorCount)
          
          // When the chat receives a message
          this.gchat.getWebSocket().addEventListener("message", (event) => {
            this.incomingMessage(event);
          });

          // When the chat unexpectely encounters an error
          this.gchat.getWebSocket().addEventListener("error", (event) => {
            console.log("Chat Message encountered and error!");
            console.log("Trying to safely recreate the instance...");
            this.chatErrorCount += 1;
            this.safelyCreateChatInstance();
          });

          // When the chat closes
          //    --> 1000: Normal close
          //    --> Other: Abnormal/erroneous close
          this.gchat.getWebSocket().addEventListener("close", (event) => {

            let exitCode = event.code;
            console.log("Chat Message has closed! Exit Code: ", exitCode);

            if(exitCode == 1000){
              this.chatClosingCount++;
            }else{
              this.chatErrorCount++;
            }

            this.safelyCreateChatInstance();

          });

          break;
        } catch (error) {
          console.log("Error in the initialization phase of the Chat: ", error);
          console.log("Attempting to retry...")

          this.chatErrorCount += 1;
        }

      }
    },

    sendMessage (text) {
      if (text.length > 0 && this.gchat) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.gchat.sendMessage(text);
      }
    },

    incomingMessage: function(event){
      if(this.gchat){
        let newMessage = this.gchat.processReceivedMessage(event.data);
        if(newMessage.author != 'server')
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
      this.$emit('closeChat');
      this.isChatOpen = false;
    },

    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    
    handleOnType () {
      console.log('Emit typing event')
    },

  },

  props: {
    offerId: {
      type: Number,
      required: true,
    },
    chatActive: {
      type: Boolean,
      default: true,
    },
  },

  beforeMount(){

    this.gsecurity = GSecurity;
    this.gsecurity.obtainSavedCredentials();
    this.gtrans = new GTrans(this.gsecurity.getLanguage());
    this.protocol = window.location.protocol == 'https:' ? 'wss' : 'ws';
    
    // Try to create a new chat instance
    this.safelyCreateChatInstance();

    // Retrieve the conversation's history
    var authorizedGAxios = GAxios;
    authorizedGAxios.get(endpoints.chat + this.offerId.toString() + '/').then(response =>{
      
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

      // Update message list
      for(var i = 0; i < messages.length; i++){

        var m = messages[i].json;
        this.messageList.push(this.gchat.formatVueChatMessage(m.username, m.message, m.hour));
      }

      console.log(this.messageList);

    });

  },
  updated() {

    if(this.chatErrorCount == 0){
      this.placeholder = this.chatActive ? this.gtrans.translate('chatPlaceholder_1') : this.gtrans.translate('chatPlaceholder_2') ;
    }else if(this.chatErrorCount == 1){
      this.placeholder = this.gtrans.translate('chatPlaceholder_err_1');
    }else{
      this.placeholder = this.gtrans.translate('chatPlaceholder_err_2');
    }

  },
}




</script>

<style scoped>

</style>
