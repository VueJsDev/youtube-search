export default {

	GET_CHANNELS_LIST(state) {
      return state.channel_list;
    },

    GET_LOADING_DATA_CHANNELS_AND_STATISTICS(state) {
    	return state.loading
    },

    GET_NEXT_PAGINATION(state) {
    	return state.nextPage
    },

    GET_PREV_PAGINATION(state) {
    	return state.prevPage
    },

    GET_LOADING_DATA_GIF(state) {
        return state.loadingGif
    },

}