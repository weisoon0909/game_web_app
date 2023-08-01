const state = () => ({})

const getters = {}

const mutations = {}

const actions = {
    apiGetGame({commit}, {page, page_size, platforms, dates, ordering}) {
        var key = "6eaf82e6cd264cbd9ea5950dd863e5dc"
        let _url = "https://api.rawg.io/api/games",
            paramData = {
                params: {
                    page: Number(page),
                    page_size: page_size,
                    platforms: platforms,
                    dates: dates,
                    ordering: ordering,
                    key: key
                }
            };
        return new Promise((resolve, reject) => {
            this.$axios.$get(_url, paramData).then(res => {
                return resolve(res);
            }).catch(error => {
                return reject(error);
            });
        });
    },
    apiGetDetail({commit}, {id}) {
        var key = "6eaf82e6cd264cbd9ea5950dd863e5dc"
        let _url = "https://api.rawg.io/api/games/",
            paramData = {
                params: {
                    key: key
                }
            };
        return new Promise((resolve, reject) => {
            this.$axios.$get(_url + id, paramData).then(res => {
                return resolve(res);
            }).catch(error => {
                return reject(error);
            });
        });
    },
    
}

export default {
    state,
    getters,
    mutations,
    actions,
}