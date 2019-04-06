<template>
    <div class="container tarjeta">
        <div class="contenido">
            <div id="titulo">
                <strong>
                    <h3>{{ title }}</h3>
                </strong>
            </div>
            <hr />
            <div v-for="item in filters_data" :key="item.id" class="row filter-item">
                <div class="col vertical-center">
                    <span>{{item.text}}</span>
                </div>
                <div class="col right-alignment">
                    <label class="switch" style="margin:0px;">
                        <input :id="item.id" type="checkbox" :checked="item.selected ? true : false" @change="onFiltersChange($event)">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <hr />
            <div class="row filter-item">
                <div class="col vertical-center">
                    <span>Score </span>
                </div>
                <div class="col right-alignment">
                    <button :class="buttonFilterStatus == 0 ? 'filterButtonDisabled' : 'filterButton'" class="vertical-center" style="height: 25px; float:right" @click="changeScoreFilter()">
                    <div class="vertical-center filterButtonText" style="margin: 0 auto; color:white;">
                        <strong><i style="float:right" class="material-icons">{{scoreFilterImage}}</i></strong>
                    </div>
                    </button> 
                </div>
            </div>
            <hr />
            <div class="row filter-item">
                <div class="col vertical-center">
                    <span>Zones</span>
                </div>
            </div>
            <div class="row filter-item">
                <b-form-select v-model="selectedZone" style="width:90%; margin:0 auto;" @change="changeZone()">
                    <option :value="null">Please select an option</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option value="b">&nbsp;&nbsp;Option B</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option :value="null">Please select an option</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                    <option value="a">&nbsp;&nbsp;Option A</option>
                </b-form-select>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    name:'FiltersSideMenu',

    data: function(){
        return{
            title: "Filter by",
            buttonFilterStatus: 0,
            selectedZone: undefined,
        }
    },

    computed:{
        scoreFilterImage(){
            return this.buttonFilterStatus < 2 ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
        }
    },

    methods:{
        onFiltersChange: function (event){
            this.$props.filters_data[event.target.id].selected = !this.$props.filters_data[event.target.id].selected;
            var status = Array();

            for(var key in this.$props.filters_data){
                var value = this.$props.filters_data[key];

                if(value.selected){
                    status.push(value.id);
                }
            }

            // New filters, including Sort & Zones
            var newStatus = Array();

            newStatus.push(this.selectedZone);
            newStatus.push(this.buttonFilterStatus);

            this.$emit('onFiltersChange', status, newStatus);
        },

        changeScoreFilter: function(){
            this.buttonFilterStatus = ++this.buttonFilterStatus % 3;
            
            var status = Array();

            for(var key in this.$props.filters_data){
                var value = this.$props.filters_data[key];

                if(value.selected){
                    status.push(value.id);
                }
            }

            // New filters, including Sort & Zones
            var newStatus = Array();

            newStatus.push(this.selectedZone);
            newStatus.push(this.buttonFilterStatus);

            this.$emit('onFiltersChange', status, newStatus);
        },

        changeZone: function(){
            var status = Array();

            for(var key in this.$props.filters_data){
                var value = this.$props.filters_data[key];

                if(value.selected){
                    status.push(value.id);
                }
            }

            // New filters, including Sort & Zones
            var newStatus = Array();

            newStatus.push(this.selectedZone);
            newStatus.push(this.buttonFilterStatus);

            this.$emit('onFiltersChange', status, newStatus);
        }
    },

    props:{
        filters_data: Array,
    },
}
</script>

<style scoped>

    .tarjeta{
        border-radius: 10px;
        background-color: rgb(246, 247, 248); 
        text-align: left; 
 
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .2);
        margin-top: 60px;
        width: 100%;
    }

    .contenido{
        padding-top: 10px; 
        padding-bottom: 20px;
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

</style>


