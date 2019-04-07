<template>
    <div class="container tarjeta">
        <div class="contenido">
            <div id="titulo">
                <strong>
                    <h3>{{ title }}</h3>
                </strong>
            </div>
            <!-- Simple Filters -->
            <hr />
            <div id="simpleFilters" v-for="item in simple_filters" :key="item.text" class="row filter-item">
                <div class="col vertical-center">
                    <span>{{item.text}}</span>
                </div>
                <div class="col right-alignment">
                    <label class="switch" style="margin:0px;">
                        <input :id="item.id" type="checkbox" :checked="item.value ? true : false" @change="onSimpleFiltersChange($event)">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <hr />
            <!-- TriState Filters -->
            <div id="tristateFilters" v-for="item in tristate_filters" :key="item.text" class="row filter-item">
                <div class="col vertical-center">
                    <span>{{item.text}}</span>
                </div>
                <div class="col right-alignment">
                    <button :class="item.value == 0 ? 'tristateDeac' : 'tristate'" class="vertical-center" style="height: 25px; float:right" :id="item.id" @click="onTristateFiltersChange($event)">
                        <div class="vertical-center tristateText" style="margin: 0 auto; color:white;" :id="item.id">
                            <strong><i style="float:right" class="material-icons" :id="item.id">{{tristateIcon(item.id)}}</i></strong>
                        </div>
                    </button> 
                </div>
            </div>
            <!-- Selector Filters -->
            <hr />
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
            singleSelectorValue: undefined,
        }
    },

    methods:{

        tristateIcon(item_id){

            if(this.$props.tristate_filters[item_id] && this.$props.tristate_filters[item_id].value < 2)
                return 'keyboard_arrow_up';
            else
                return 'keyboard_arrow_down';
        },

        onSimpleFiltersChange: function(event){
            // (De)Select the Filter the user chose
            this.$props.simple_filters[event.target.id].value = !this.$props.simple_filters[event.target.id].value;
            this.notifyChange();
        },

        onTristateFiltersChange: function(event){
            // (De)Select the Filter the user chose
            this.$props.tristate_filters[event.target.id].value = ++this.$props.tristate_filters[event.target.id].value % 3;
            this.notifyChange();
        },

        onSelectorFiltersChange: function(selector_id){
            // (De)Select the Filter the user chose
            this.$props.selector_filters[selector_id].value = this.singleSelectorValue;
            this.notifyChange();
        },

        notifyChange: function (event){
            
            // Simple Filters
            /* 

            The current implementation directly modifies
            $props, so this is not necessary by this time.

            var simpleStates = Array();

            for(var key in this.$props.simple_filters){
                var switcher = this.$props.simple_filters[key];

                if(switcher.value){
                    simpleStates.push(switcher.id);
                }
            }

            // TriState Filters
            var triState = Array();

            for(var key in this.$props.tristate_filters){
                var tristate = this.$props.tristate_filters[key];
                triState.push(tristate.value);
            }


            // Selector Filters
            var selectorState = Array();

            for(var key in this.$props.selector_filters){
                var selector = this.$props.selector_filters[key];
                selectorState.push(selector.value);
            }
            */
        
            this.$emit('onFiltersChange');
        },
    },

    props:{
        simple_filters: Array,
        tristate_filters: Array,
        selector_filters: Array,
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


