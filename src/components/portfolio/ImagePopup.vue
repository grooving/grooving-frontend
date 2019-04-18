<template>
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <section class="modal-body vertical-center" id="modalDescription">
            <div class="container-fluid panelInfoContainer">
                <div class="col-12 col-sm-10 horizontal-center panelInfo">
                    <div id="mainTitle" class="col">
                        <h3 style="font-weight:bold">{{title}}</h3>
                        <hr>
                    </div>
                    <div id="mainBody" class="col">
                        <img class="popupImage" :src="photo" />
                    </div>
                    <div id="confirmButton">
                        <a @click="onClosePopUp()" class="btn btn-primary grooving-button"><span class="grooving-button-text">OK</span></a>
                    </div>
                </div>               
            </div>
        </section>
      </div>
    </div>
</template>

<script>
  export default {

    name: 'ImagePopup',

    data: function(){
        return{
            title: "ROSALÍA",
            buttonFilterStatus: 0,
            singleSelectorValue: undefined,
        }
    },

    methods: {

       onClosePopUp: function(){
           this.$emit('onClosePopUp')
       },
       
    },

    props:{
        photo: String,
    },

  };
</script>

<style scoped>

    .filterButton {
        font-size: 24px;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .filterButton:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .filterButtonDisabled {
        font-size: 24px;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #a2a2a2, #474747);
    }

    .filterButtonDisabled:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #515151, #232323) !important;
    }

    .filterButtonText {
        padding: 0px 10px 0px 10px;
    }

    .horizontal-center{
        margin: 0 auto !important;
    }

    .panelInfoContainer{
        margin: 0 auto !important;
        max-width: 800px;
    }

    .panelInfo{
        background-color: white;
        border-radius: 10px;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
        padding: 20px;
    }

    .grooving-button {
        font-size: 1.25rem;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .grooving-button:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.7) !important;
    }

    .grooving-button-text {
        padding: 0px 20px 0px 20px;
        color: white;
    }

    .tristate {
        font-size: 24px;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    .tristate:hover{
        background-image: linear-gradient(to right, #14Ca9f, #1648d0) !important;
    }

    .tristateDeac {
        font-size: 24px;
        font-weight:bold;
        
        border: none;
        border-radius: 30px;

        background-image: linear-gradient(to right, #a2a2a2, #474747);
    }

    .tristateDeac:hover{
        box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .7) !important;
        background-image: linear-gradient(to right, #515151, #232323) !important;
    }

    .tristateText {
        padding: 0px 10px 0px 10px;
    }

    header{
        height: 75px;
    }

    input{
        border-radius:100px; 
        width: 100%;
    }
    
    .vertical-center{
        display: flex; 
        align-items: center;  /*Aligns vertically center */
    }

    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background: rgba(255, 255, 255, 0.75);
        
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        
    }

    .modal-header{
        padding: 15px;
        display: flex;
        background-color: rgb(246, 247, 248);
    }

    .modal-header {
        border-bottom: 1px solid #eeeeee;
        color: #4AAE9B;
        justify-content: space-between;
    }

    .modal-body {
        position: relative;
        background-color: rgba(255, 255, 255, 0.9);
    }

    .tarjeta{
        border-radius: 10px;
        background-color: rgb(246, 247, 248); 
        text-align: left; 
        max-width:300px;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
    }

    .contenido{
        padding-top: 10px; 
        padding-bottom: 20px;
    }

    .right-alignment{
        text-align:right
    }

    .filter-item{
        padding-bottom: 10px;
    }

    .vertical-center{
        display: flex; 
        align-items: center;  /*Aligns vertically center */
    }

    .popupImage{
        width: 100%;
        height: 100%;
        border-radius: 10px 10px 10px 10px;
    }

    #confirmButton{
        margin-top: 10px;
    }
    
</style>