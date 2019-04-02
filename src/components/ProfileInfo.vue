<template>
    <div class="content">
        <form>
            <div class="form-row">
                <div class="form-group col-12">
                    <span class="card-title" style="font-weight:bold;font-size:30px;margin-bottom:12px">Profile </span>
                    <router-link v-bind:to="{name: 'editPersonalInfo', params: {}}" style="height: 28px; width: 28px; margin-bottom:12px;">
                        <i class="material-icons iconOffer">create</i>
                    </router-link>
                    <h6 class="card-subtitle mb-2 text-muted">Basic info of your Grooving account, like your name and email.</h6>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">FIRST NAME</p>
                        <p class="card-text" style="float:right;">{{name}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:25px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">LAST NAME</p>
                        <p class="card-text" style="float:right;">{{surnames}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">USERNAME</p>
                        <p class="card-text" style="float:right;">{{username}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">PASSWORD</p>
                        <p class="card-text" style="float:right;">&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">EMAIL</p>
                        <p class="card-text" style="float:right;">{{email}}</p>
                    </div>
                    <hr style="margin-top:0px;margin-bottom:0px;"/>
                    <div style="width:100%;margin-top:16px;">
                        <p class="card-text" style="font-weight:bold;display:inline-block;">PHONE</p>
                        <p class="card-text" style="float:right;">{{phoneNumber}}</p>
                    </div>
                </div>  
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "profileInfo",
    props: {
        name: {
            type: String,
            //default: 'John'
        },
        surnames: {
            type: String,
            //default: 'Pug Retriever'
        },
        email: {
            type: String,
            //default: 'johnpug@pugsftw.com'
        },
        phoneNumber: {
            type: String,
            //default: '633017787'
        },
        username: {
            type: String,
            default: 'josembell'
        }
    },
}
</script>

<style scoped>

    a.router-link-active {
        color: #187fe6 !important;
    }

    .content {
        padding: 10px;
    }

    .form-group.col-12 {
        margin-bottom: 0px;
    }

    .iconOffer  {
         font-size: 28px;
         float: right;
    }

    @media (max-width:767px)  {
        .content{
            padding-top: 5%;
            margin-right: 3%;
            margin-left: 3%;
        }

        .iconOffer  {
            font-size: 50px;
            float: right;
        }
    }

    @media (min-width:768px)  {
        form{
            margin-top:5px;
            width: 320px;
            margin-right: 4%;
            margin-left: 4%;
            margin-bottom: 0;
        }

        .content{
            margin-top: 10% !important;
            margin-left: 3%;
            border-radius: 10px;
            display: flex;
            align-items: center;
            box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, .3);
        }
    }

</style>