<template>
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
        </header>
        <section class="modal-body vertical-center" id="modalDescription">
            <div class="container-fluid panelInfoContainer">
                <div class="col-12 col-sm-6 horizontal-center panelInfo">
                    <div id="mainTitle" class="col">
                        <h3>Filter by</h3>
                        <hr>
                    </div>
                    <div id="switchers" class="col">
                        <!-- Simple Filters -->
                        <div v-for="item in simple_filters" :key="item.text" class="row filter-item horizontal-center">
                            <div id="filterTitle" class="col-6 vertical-center pl-0">
                                <span style="margin-left: 0px; text-align: left;">{{item.text}}</span>
                            </div>
                            <div class="col-6 right-alignment pr-0">
                                <label class="switch" style="margin:0px;">
                                    <input :id="item.id" type="checkbox" :checked="item.value ? true : false" @change="onSimpleFiltersChange($event)">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <hr>
                        <!-- TriState Filters -->
                        <div id="tristateFilters" v-for="item in tristate_filters" :key="item.text" class="row filter-item">
                            <div class="col vertical-center">
                                <span style="margin-left: 0px">{{item.text}}</span>
                            </div>
                            <div class="col right-alignment">
                                <button :class="item.value == 0 ? 'tristateDeac' : 'tristate'" class="vertical-center" style="height: 25px; float:right" :id="item.id" @click="onTristateFiltersChange($event)">
                                    <div class="vertical-center tristateText" style="margin: 0 auto; color:white;" :id="item.id">
                                        <strong><i style="float:right" class="material-icons" :id="item.id">{{tristateIcon(item.id)}}</i></strong>
                                    </div>
                                </button> 
                            </div>
                        </div>
                        <hr>
                        <!-- Selector Filters -->
                        <div id="selectorFilters" v-for="item in selector_filters" :key="item.text">
                            <div class="row filter-item">
                                <div class="col vertical-center">
                                    <span>{{item.text}}</span>
                                </div>
                            </div>
                            <div class="row filter-item">
                                <b-form-select v-model="singleSelectorValue" style="width:90%; margin:0 auto;" @change="onSelectorFiltersChange(item.id)">
                                    <option :value="undefined">---------</option>
                                    <option v-for="opt in item.data" :key="opt.text" :value="opt.value">
                                        <span v-for="times in opt.depth" :key="times">&nbsp;&nbsp;</span>
                                        <span>{{opt.text}}</span>
                                    </option>
                                </b-form-select>
                            </div>
                        </div>
                        <div id="confirmButton">
                            <a @click="onConfirmFilters()" class="btn btn-primary grooving-button"><span class="grooving-button-text">OK</span></a>
                        </div>
                    </div>
                </div>               
            </div>
        </section>
      </div>
    </div>
</template>

<script>
  export default {

    name: 'FiltersModalMenu',

    data: function(){
        return{
            title: "Filter by",
            buttonFilterStatus: 0,
            singleSelectorValue: undefined,
        }
    },

    methods: {

        tristateIcon(item_id){

            if(this.$props.tristate_filters[item_id] && this.$props.tristate_filters[item_id].value < 2)
                return 'keyboard_arrow_up';
            else
                return 'keyboard_arrow_down';
        },

        onSimpleFiltersChange: function (event){
            // (De)Select the Filter the user chose
            this.$props.simple_filters[event.target.id].value = !this.$props.simple_filters[event.target.id].value;
        },

        onTristateFiltersChange: function(event){
            // (De)Select the Filter the user chose
            this.$props.tristate_filters[event.target.id].value = ++this.$props.tristate_filters[event.target.id].value % 3;
        },

        onSelectorFiltersChange: function(selector_id){
            // (De)Select the Filter the user chose
            this.$props.selector_filters[selector_id].value = this.singleSelectorValue;
        },

        onConfirmFilters: function (){
            this.$emit('onFiltersChange');
            this.$emit('filterSelectionClose');
        },
    },

    props:{
        simple_filters: Array,
        tristate_filters: Array,
        selector_filters: Array,
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

    /* Switch */
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 45px;
        height: 25px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 17px;
        width: 17px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-image: linear-gradient(to right, #00fb82, #187fe6);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }


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

    .filterButtonText {
        padding: 0px 10px 0px 10px;
    }
    
</style>