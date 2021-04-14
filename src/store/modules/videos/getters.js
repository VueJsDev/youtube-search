export default {

	GET_VIDEOS_LIST(state) {
      return state.videos_list;
    },

    GET_LOADING_DATA_VIDEOS_AND_STATISTICS(state) {
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