<template>
    <div class="content" :class="$device.isMobile ? 'mobile' : 'desktop'">
        <h2>
            Playstation 5 Games Search
        </h2>
        <div class="game-list-container">
            <div class="date-container">
                <div class="datepicker-container">
                    <b-form-datepicker class="datepicker" :min="startMin" :max="startMax" v-model="startDate" @input="dateChange('start')" locale="en"></b-form-datepicker>
                    <b-form-datepicker class="datepicker" :min="endMin" :max="endMax" v-model="endDate" @input="dateChange('end')" locale="en"></b-form-datepicker>
                </div>
                <b-button class="search-btn" @click="find()"><b-icon :icon="'search'"></b-icon></b-button>
            </div>
            <div class="result-container">
                <div v-if="loading" class="loading-class">
                    <b-spinner style="width: 1rem; height: 1rem;" type="grow"></b-spinner>
                    <b-spinner style="width: 3rem; height: 3rem;" type="grow"></b-spinner>
                    <b-spinner style="width: 1rem; height: 1rem;" type="grow"></b-spinner>
                </div>
                <div v-else v-for="(item, index) in result" :key="index" class="result-items">
                    <div class="image">
                        <img :src="item.background_image" />
                    </div>
                    <div class="detail-container">
                        <span class="name-text">{{ item.name }}</span>
                        <span class="released-date">Released at <span class="date-text">{{ item.released }}</span></span>
                        <span class="metacritic-score">Metacritic Score: <span class="score">{{ item.metacritic ? item.metacritic : '-' }}</span> </span>
                    </div>
                    <div class="more-container">
                        <b-button v-b-modal.modal-detail @click="getDetails(item)" class="more-btn">See More</b-button>
                    </div>
                </div>
                <div class="change-page-container">
                    <span class="nav-content" @click="prevApi ? changePage('prev') : ''" :class="{ disabled: !prevApi }"> &lt;&lt; Prev Page</span>
                    <span class="current-page">{{ currentPage }}</span>
                    <span class="nav-content" @click="nextApi ? changePage('next') : ''" :class="{ disabled: !nextApi }">Next Page &gt;&gt;</span>
                </div>
            </div>
        </div>
        <b-modal v-if="selectedDetails" id="modal-detail" v-model="modalVar" :title="selectedDetails.name" hide-footer>
            <Details :passed-obj="selectedDetails"/>
        </b-modal>
    </div>
</template>

<script>
import { BIcon, BIconSearch, BIconInfoCircle } from 'bootstrap-vue'
import Details from './details.vue'
export default {
    data() {
        return {
            result: '',
            paramDate: '2020-05-18,2021-05-18',
            currentPage: 1,
            startDate: this.$moment('2020-05-18').format('YYYY-MM-DD'),
            endDate: this.$moment('2021-05-18').format('YYYY-MM-DD'),
            startMin: this.$moment('1970-01-01').format('YYYY-MM-DD'),
            startMax: this.$moment('2021-05-18').format('YYYY-MM-DD'),
            endMin: this.$moment('2020-05-18').format('YYYY-MM-DD'),
            endMax: this.$moment().format('YYYY-MM-DD'),
            prevApi: null,
            nextApi: null,
            loading: true,
            selectedDetails: null,
            modalVar: false
        }
    },
    components: {
        BIcon,
        BIconSearch,
        BIconInfoCircle,
        Details
    },
    mounted() {
        this.getApi()
    },
    methods: {
        getDetails(item) {
            this.selectedDetails = item
        },
        changePage(type) {
            if (type === 'prev') {
                this.currentPage -= 1
            } else {
                this.currentPage += 1
            }
            this.getApi()

        },
        dateChange(type){
            if (type === 'start') {
                this.endMin = this.$moment(this.startDate).format('YYYY-MM-DD')
            } else {
                this.startMax = this.$moment(this.endDate).format('YYYY-MM-DD')
            }
        },
        find() {
            this.paramDate = this.startDate + ',' + this.endDate
            this.currentPage = 1
            this.getApi()
        },
        async getApi() {
            this.loading = true
            await this.$store.dispatch('game/apiGetGame', {
                page: this.currentPage,
                page_size: 20,
                platforms: 187,
                dates: this.paramDate,
                ordering: "-released"
            }).then(res => {
                this.result = res.results
                this.prevApi = res.previous
                this.nextApi = res.next
            }).catch(err => {
                console.log('err', err)
            })
            this.loading = false
        }
    },
}
</script>

<style lang="scss"> 
body {
    min-height: 100vh;
    background-color: #D0B49F;
}
.desktop {
    padding: 0 20%;
    
    .name-text {
        font-size: 20px !important;
    }
    .released-date {
        font-size: 17px !important;
        .date-text {
            font-size: 20px !important;
        }
    }
    .metacritic-score {
        font-size: 17px !important;
        .score {
            font-size: 22px !important;
        }
    }
}
.content {
    width: 100%;
    .title {
        .datepicker {
            width: 45%;
        }
        .search-btn {
            flex: 1;
        }
    }
    .btn {
        background-color: #F1A94E;
        border: none;
    }
    .game-list-container {
        width: 100%;
        .date-container {
            background-color: #5C4033;
            display: flex;
            .datepicker-container {
                width: 90%;
                .datepicker {
                    background-color: transparent;
                    border: none;
                    &:focus {
                        box-shadow: none !important;
                    }
                    label.form-control, .btn {
                        color: #fff;
                        background-color: transparent;
                    }
                }
            }
            .search-btn {
                flex: 1;
            }
        }
        .result-container {
            background-color: #D0B49F;
            width: 100%;
            .loading-class {
                padding: 15px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #5C4033;
            }
            .result-items {
                border-bottom: 1px solid #A0816C;
                padding: 0 10px 20px 10px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                .image {
                    width: 100%;
                    padding: 15px 0;
                    img{
                        width: 100%;
                        border-radius: 10px;
                    }
                }
                .detail-container {
                    width: 70%;
                    display: flex;
                    flex-direction: column;
                    .name-text {
                        font-size: 15px;
                        color: #5C4033;
                        font-weight: bolder;
                        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    }
                    .released-date {
                        font-size: 12px;
                        color: #000;
                        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                        .date-text {
                            font-size: 15px;
                            color: 	#8B8000;
                        }
                    }
                    .metacritic-score {
                        font-size: 12px;
                        color: #5C4033;
                        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                        .score {
                            font-size: 17px;
                            color: 	#8B0000;
                        }
                    }
                }
                .more-container {
                    width: 30%;
                    .btn {
                        width: 100%;
                    }
                }
            }
            .change-page-container {
                display: flex;
                justify-content: space-around;
                padding: 20px 0;
                .nav-content {
                    &.disabled {
                        opacity: 0.5;
                    }
                }
            }
        }
    }
}
</style>
