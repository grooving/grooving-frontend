<template>
  <div class="RightMenu">
     <div class="collapse navbar-collapse width px-2 bg-light" id="sidebar">
         <p>
        <div class="navContent">
         <h2>{{gtrans.translate('hello')}}, <span>{{ userFirstName }}</span></h2>
            <ul class="navbar-nav mr-auto p-2 col align-self-center justify-content-center">
                <li class="nav-item section" v-if="!gsecurity.hasRole('ADMIN')" >
                    <div class="nav-link goTo" @click="goTo('/personalInfo')" data-toggle="collapse" data-target="#sidebar">{{gtrans.translate('myAccount')}}</div>
                    <b-dropdown-divider class="divider"/>
                </li>
                <li class="nav-item section" v-if="gsecurity.hasRole('ARTIST')">
                    <div class="nav-link goTo" @click="goTo('/showPortfolio/'+ userId + '/')"  data-toggle="collapse" data-target="#sidebar">{{gtrans.translate('myPortfolio')}}</div>
                    <b-dropdown-divider class="divider"/>
                </li>
                <li class="nav-item section" v-if="gsecurity.hasRole('ARTIST')">
                    <div class="nav-link goTo" @click="goTo('/hiringSettings')" data-toggle="collapse" data-target="#sidebar">{{gtrans.translate('hiringSettings')}}</div>
                    <b-dropdown-divider class="divider"/>
                </li>                
                <li class="nav-item section" v-if="gsecurity.hasRole('ADMIN')">
                    <div class="nav-link goTo" @click="goTo('/usersList/')"  data-toggle="collapse" data-target="#sidebar">{{gtrans.translate('usersListRM')}}</div>
                    <b-dropdown-divider class="divider"/>
                </li>
                <li class="nav-item section" v-if="gsecurity.hasRole('ADMIN')">
                    <div class="nav-link goTo" @click="goTo('/manageZones/all/')"  data-toggle="collapse" data-target="#sidebar">{{gtrans.translate('manageZones')}}</div>
                    <b-dropdown-divider class="divider"/>
                </li>
                <li class="nav-item section" v-if="gsecurity.hasRole('ADMIN')">
                    <div class="nav-link goTo" @click="goTo('/manageGenres/all/')"  data-toggle="collapse" data-target="#sidebar">{{gtrans.translate('manageGenres')}}</div>
                    <b-dropdown-divider class="divider"/>
                </li>
                <li class="nav-item section" v-if="gsecurity.hasRole('ADMIN')">
                    <div class="nav-link goTo" @click="goTo('/statistics')" data-toggle="collapse" data-target="#sidebar">{{gtrans.translate('statistics')}}</div>
                    <b-dropdown-divider class="divider"/>
                </li>     
                <li class="nav-item section" v-if="gsecurity.hasRole('ADMIN')">
                    <div class="nav-link goTo" @click="goTo('/breachNotification/')"  data-toggle="collapse" data-target="#sidebar">{{gtrans.translate('breachNotification')}}</div>
                    <b-dropdown-divider class="divider"/>
                </li>
                <!-- <li class="nav-item section">
                    <a class="nav-link" href="#" data-toggle="collapse" data-target="#sidebar">Messages</a>
                     <b-dropdown-divider class="divider"/>
                </li> -->
                <li class="nav-item section">
                    <a class="nav-link" href="" v-on:click="logout()">{{gtrans.translate('logOut')}}</a>
                </li>
            </ul>
        </div>
        </div>
  </div>
</template>

<script>
import GSecurity from '@/security/GSecurity.js';
import GTrans from "@/utils/GTrans.js";
import {mapActions} from 'vuex';

export default {
    name: 'RightMenu',
    data: function(){
        return{
            gsecurity: GSecurity,
            gtrans: undefined,
            userFirstName: '',
            userId: '',
            url: undefined,
            refresher: undefined,
        }
    },
    methods: {
        ...mapActions(['clearStore', 'setURL']),
        logout() {
            this.gsecurity.deauthenticate();
            this.$router.push({ path: "/" });
        },

        refreshGSecurityData: function() {
            this.userFirstName = this.gsecurity.getFirstName();
            this.userId = this.gsecurity.getId();
        },
        goTo(path) {
            
            this.url = this.$store.getters.sideMenus.url;
            if(this.url !== path) {
                this.setURL(path);
                this.clearStore().then(() => this.$router.push(path));  
            } else {
                this.$emit('samePage');
            }
        },
    },
    props: {
        blur: Boolean,
    },
    created() {
        // Retreive stored credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        // Update data that depends on GSecurity
        this.refreshGSecurityData();

        this.gtrans = new GTrans(this.gsecurity.getLanguage());
            
        // Podemos cambiar el lenguaje así para debug...
        //this.gtrans.setLanguage('es')
        //this.gtrans.setLanguage('en')
    },

    beforeUpdate: function() {
        // Retreive stored credentials
        this.gsecurity = GSecurity;
        this.gsecurity.obtainSavedCredentials();

        // Update data that depends on GSecurity
        this.refreshGSecurityData();
    },
}
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 75) {
        $('#sidebar').offset({top:window.pageYOffset});        
    } else {
        $('#sidebar').offset({top:75});
    }
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
    font-family: "Archivo"
}
.goTo {
    cursor: pointer;
    background-color: transparent;
    color: #007bff;
}

.goTo:hover {
    color: #0056b3;
}

.title {
    font-weight: bold;
    margin-right: 5px;
}

.navContent {
    margin-right: 20px;
}

.section {
    font-size: 18px;
}

#sidebar.collapse {
    text-align: right;
    position: fixed;
    z-index: 2000;
    transition: right .3s ease;
    
    right: -130%; /* -width of sidebar */
    width: 100%;
    height: fit-content !important;
    display: block;
    overflow: auto
}

#sidebar.collapsing {
    text-align: right;
    transition: right .18s ease-in;
    position: fixed;
    z-index: 2000;
    right: -130%;  /* -width of sidebar */
    width: 100%;  /* width of sidebar */
    height: fit-content !important;
    display: block;
    overflow: auto
}

#sidebar.collapse.show {
    text-align: right;
    right: 0;
    width: 100%;  /* width of sidebar */
}
#sidebar {
    width: auto;
    position: relative;
    right: 0;
    box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, .3);
}

.divider {
    width: 100%;
}


@media (min-width: 768px) {

    .title {
        font-weight: bold;
        margin-right: 5px;
    }

    .navContent {
        margin-right: 20px;
    }

    .section {
        font-size: 20px;
    }


    #sidebar.collapse {
        
        text-align: right ;
        z-index: 2000;
        transition: right .3s ease;
        right: -30%; /* -width of sidebar */
        width: 0;
        height: 100% !important;
        display: block;
        overflow: auto
    }

    #sidebar.collapsing {
        text-align: right;
        transition: right .18s ease-in;
        z-index: 2000;
        right: -30%;  /* -width of sidebar */
        width: auto ;  /* width of sidebar */
        height: 100% !important;
        display: block;
        overflow: auto
    }

    #sidebar.collapse.show {
        text-align: right;
        width: auto ;  /* width of sidebar */
    }
    #sidebar {
        width: auto;
        float: right;
    }

}

</style>