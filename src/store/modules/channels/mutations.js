export default {

	SET_LOADING_STATUS: (state, status) => {
		state.loading = status
	},

    SET_CHANNEL_LIST_AND_STATISTICS: (state, object) => {
    	state.nextPage = object.nextPage
    	state.prevPage = object.prevPage
    	state.channel_list = object.responseStatistics
    },

    SET_LOADING_STATUS_GIF: (state, status) => {
    	state.loadingGif = status
    },

    SET_CLEAN_STATE_RESULTS_LIST: (state) => {
    	state.channel_list = []
    	state.nextPage = ''
		state.prevPage = ''
		state.loading = false
    }

}