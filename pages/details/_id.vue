<template>
    <div v-if="loadingDetails" class="loadingDetail-class">
        <b-spinner style="width: 1rem; height: 1rem;" type="grow"></b-spinner>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow"></b-spinner>
        <b-spinner style="width: 1rem; height: 1rem;" type="grow"></b-spinner>
    </div>
    <div v-else>
        <div class="info-container">
            <b-button v-b-toggle.collapse-desc>Description</b-button>
            <b-collapse id="collapse-desc">
                <b-card>
                    <p v-html="gameDetails.description"></p>
                </b-card>
            </b-collapse>
            <b-button v-b-toggle.collapse-platforms>Available Platforms</b-button>
            <b-collapse id="collapse-platforms">
                <b-card>
                    <ul>
                        <li v-for="(item, index) in gameDetails.platforms" :key="index"> {{ item.platform.name }}</li>
                    </ul>
                </b-card>
            </b-collapse>

            <b-button v-b-toggle.collapse-genre>Game Genre</b-button>
            <b-collapse id="collapse-genre">
                <b-card>
                    <ul>
                        <li v-for="(item, index) in gameDetails.genres" :key="index"> {{ item.name }}</li>
                    </ul>
                </b-card>
            </b-collapse>
            <b-button v-b-toggle.collapse-dev>Developers</b-button>
            <b-collapse id="collapse-dev">
                <b-card>
                    <ul>
                        <li v-for="(item, index) in gameDetails.developers" :key="index"> {{ item.name }}</li>
                    </ul>
                </b-card>
            </b-collapse>
            <b-button v-b-toggle.collapse-publisher>Publishers</b-button>
            <b-collapse id="collapse-publisher">
                <b-card>
                    <ul>
                        <li v-for="(item, index) in gameDetails.publishers" :key="index"> {{ item.name }}</li>
                    </ul>
                </b-card>
            </b-collapse>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        passedObj: { type: String, default: null }
    },
    data() {
        return {
            slide: 0,
            gameDetails: null,
            loadingDetails: true,
            getId: null
        }
    },
    mounted() {
    this.getId = this.$route.params.id 
        this.getDetails()
    },
    methods: {
        async getDetails() {
            this.loadingDetails = true
            await this.$store.dispatch('game/apiGetDetail', {
                id: this.getId
            }).then(res => {
                this.gameDetails = res
            }).catch(err => {
                console.log('err', err)
            })
            this.loadingDetails = false
        }
    }
}
</script>

<style lang="scss">
.loadingDetail-class {
    padding: 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #5C4033;
}
.info-container {
    .btn {
        width: 100%;
        margin: 10px 0;
    }
}
</style>
