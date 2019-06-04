<template>
    <div class="everything">
        <ZonesList :key="parentId" :parentId="parentId" :parentZoneName="parentZoneName" :zones="zoneChildren" @viewPrevious="lastList" @viewChildren="updateList" @newZone="newZone"
            @editZone="editZone" @deleteZone="deleteZone"/>
    </div>
</template>

<script>
import ZonesList from '@/components/ZonesList.vue'
import GSecurity from '@/security/GSecurity.js';
import GAxios from '@/utils/GAxios.js';
import endpoints from '@/utils/endpoints.js';

export default {

    name: 'ManageZones',
    components: {
        ZonesList, 
    },
    data() {
        return {
            gsecurity: GSecurity,
            parentId: undefined,
            parentZoneName: undefined,
            grandParentId: undefined,
            zoneBackLink: undefined,
            zoneChildren: Array(),
            depth: undefined,
            tree: Array(),
            allZones: undefined,
            zoneId: undefined,
        }
    },
    methods: {
        newZone(parentId) {
            for(var i = 0; i < this.tree.length; i++) {
                if(this.tree[i].id == parentId) {
                    var parentZone = this.tree[i]
                }
            }
            this.$router.push({name: 'createZone', params: {parentZone}});
        },
        deleteZone(zoneId) {
            for(var i = 0; i < this.tree.length; i++) {
                if(this.tree[i].id == zoneId) {
                    var zone = this.tree[i]
                }
            }
            this.$router.push({name: 'deleteZone', params: {zone}});
        },
        editZone(zoneId) {
            for(var i = 0; i < this.tree.length; i++) {
                if(this.tree[i].id == zoneId) {
                    var zone = this.tree[i]
                    var parentId = zone.parent;
                    var parentName = ''
                    if(parentId != 'all') {
                        for(var n = 0; n < this.tree.length; n++) {
                            if(this.tree[n].id == parentId) {
                                parentName = this.tree[n].name;
                            }
                        }
                    }                     
                }
            }
            console.log("edit", zone, parentName);
            this.$router.push({name: 'editZone', params: {zone, parentName}});
        },
        updateList(zoneId) {
            this.zoneChildren = Array();
            this.parentId = 0;
            this.parentZoneName = '';
            for(var i = 0; i < this.tree.length; i++) {
                if(this.tree[i].id == zoneId) {
                    if(this.tree[i].depth < 2) {
                        var children = this.tree[i].children
                        if(children.length > 0) {
                            for(var x = 0; x < children.length; x++) {
                                var zone = children[x];
                                this.zoneChildren.push({id:zone['id'], name: zone['name'], parent: zone['parent'], children: zone['children'], depth: this.tree[i].depth + 1})
                                this.parentId = this.tree[i].id;
                                this.parentZoneName = this.tree[i].name;
                            }
                        } else {
                            this.parentId = this.tree[i].id;
                            this.parentZoneName = this.tree[i].name;
                        }
                    }
                    else {
                        var root = this.tree[0];
                        this.zoneChildren.push({id:root['id'], name: root['name'], parent: 'all', children: root['children'], depth: 0})
                    }
                }
            }
        },
        lastList(parentId) {
            this.zoneChildren = Array();
            this.parentId = 0;
            this.parentZoneName = '';
            for(var i = 0; i < this.tree.length; i++) {
                if(this.tree[i].id == parentId) {
                    var parent = this.tree[i]
                    var root = this.tree[0];
                    if(parent.depth == 0) {
                        this.zoneChildren.push({id:root['id'], name: root['name'], parent: 'all', children: root['children'], depth: 0})
                        this.parentId = 0;
                    } else if (parent.depth == 1) {
                        var children = root.children
                        for(var x = 0; x < children.length; x++) {
                            var zone = children[x];
                            this.zoneChildren.push({id:zone['id'], name: zone['name'], parent: zone['parent'], children: zone['children'], depth: 1})
                            this.parentId = root.id;
                            this.parentZoneName = root.name;
                        }
                    }
                }
            }
        }
    },
    mounted() {

        if (!this.gsecurity.hasRole('ADMIN')) {
            this.$router.push({name: "error"});
        } else  {

        NProgress.start();
        
      GAxios.get(endpoints.zones)
      .then(response => {
          this.allZones = response.data;
  
      }).catch( () => {
        this.errors = ex.response.data.error;
        document.getElementById("errorsDiv").style.display = "block";
        window.scrollTo(0,0);
      });

      GAxios.get(endpoints.zones, {
      params: {
        'tree': true
      }
      }).then(response => {
          console.log(response)
        var root = response.data;

        this.tree.push({id:root['id'], name: root['name'], parent: 'all', children: root['children'], depth: 0})
        this.zoneChildren.push({id:root['id'], name: root['name'], children: root['children'], depth: 0})
        this.parentId = 0;
        for(var i=0; i < root['children'].length; i++){
            // For each Comunidad Autónoma
            var ca = root['children'][i];
            this.tree.push({id:ca['id'], name: ca['name'], parent: ca['parent'], children: ca['children'], depth: 1})

            for(var j=0; j < ca['children'].length; j++){
                // For each provincia
                var provincia = ca['children'][j];
                this.tree.push({id:provincia['id'], name: provincia['name'], parent: provincia['parent'], children: provincia['children'], depth: 2})
            }
        }

        this.zoneId = this.$route.params['zoneId'];
        if(this.zoneId !='all'){
            this.updateList(this.zoneId)
        }

      }).catch( () => {
        this.errors = ex.response.data.error;
        document.getElementById("errorsDiv").style.display = "block";
        window.scrollTo(0,0);

      }).then(() => {
            NProgress.done()
        });       
        }
    },
    
}
</script>

<style scoped>
    * {
        font-family: "Archivo"
    }

    .title {
        display: none;
    }

    @media (min-width:768px)  {
      
        .everything {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 5%;
            text-align: center;
            margin-left: 0%;
            margin-right: 0%;
            margin-top:0%;
        }
        .title {
            display: inline-block;
            margin-right: 10%;
            margin-left: 10%;
            text-align: left;
            font-size: 50px;
            margin-top: 5%;
            font-weight: bold;
        }
        
    }

</style>
