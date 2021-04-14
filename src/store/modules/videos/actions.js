import axios from "axios";
import state from './state.js'

let apiUrl = {
	baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
    part: 'snippet',
    type: 'video',
    //order: 'viewCount',
    maxResults: '',
    q: '',
    //key: 'AIzaSyAuc9S4fEC3oGMoLJbUQdV0SZ7KIon4vf8',
    key: 'AIzaSyBdgAYC6bjc0U90msoR15V03nBfvj6MN9o',
    /*prevPageToken: '',
    nextPageToken: ''*/
}

let apiStatistics = {
    baseUrlStatistics: 'https://www.googleapis.com/youtube/v3/videos?',
    partStatistics: 'id,snippet,contentDetails,status,statistics,topicDetails',
    //partStatistics: 'statistics,snippet,contentDetails',
    //keyStatistics: 'AIzaSyAuc9S4fEC3oGMoLJbUQdV0SZ7KIon4vf8',
    keyStatistics: 'AIzaSyBdgAYC6bjc0U90msoR15V03nBfvj6MN9o',
    maxResultsStatistics: '',
    //orderStatistics: 'viewCount',
    id: ''
  }

export default {

	FETCH_LOADING_STATUS: ({ commit }) => {
		commit('SET_LOADING_STATUS', true)
	},

    FETCH_LOADING_STATUS_GIF: ({ commit }) => {
        commit('SET_LOADING_STATUS_GIF', true)
    },

	FETCH_LIST_VIDEOS: ({ commit }, data) => {

      	apiUrl.q = data.keyword;
      	apiUrl.maxResults = data.results;

      	apiStatistics.maxResultsStatistics = data.results;

	  	const { baseUrl, part, type, order, maxResults, q, key } = apiUrl;
		const apiUrlVideos = `${baseUrl}part=${part}&type=${type}&q=${q}&maxResults=${maxResults}&key=${key}`;

		axios
        .get(apiUrlVideos)
        .then(res => {
            
        	let nextPage = res.data.nextPageToken;
        	let prevPage = res.data.prevPageToken

        	let responseVideos = res.data.items;
        	let textConcatVideosIds = '';

        	for ( var i = 0; i < responseVideos.length; i++ ) {
        		textConcatVideosIds += responseVideos[i].id.videoId+ ",";
        	}

        	apiStatistics.id = textConcatVideosIds;

        	const { baseUrlStatistics, partStatistics, orderStatistics, id, maxResultsStatistics, keyStatistics } = apiStatistics;
  			const urlStatistics = `${baseUrlStatistics}part=${partStatistics}&id=${id}&maxResults=${maxResultsStatistics}&key=${keyStatistics}`;

        	axios
	        .get(urlStatistics)
	        .then(res => {
	        	let responseStatistics = res.data.items;
                console.log('videos', responseStatistics)
	          	commit("SET_VIDEOS_LIST_AND_STATISTICS", {responseStatistics, nextPage, prevPage});
                commit('SET_LOADING_STATUS_GIF', false);
	        })
	        .catch(error => console.log(error));
        })
        .catch(error => console.log('porr',error))
    },

    FETCH_NEXT_PAGE: ({ commit }, next) => {

    	apiUrl.nextPageToken = next;

    	const { baseUrl, part, type, order, maxResults, q, key, nextPageToken } = apiUrl;
		const apiUrlVideos = `${baseUrl}part=${part}&type=${type}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;

		axios
        .get(apiUrlVideos)
        .then(res => {

            let nextPage = res.data.nextPageToken;
        	let prevPage = res.data.prevPageToken

        	let responseVideos = res.data.items;
        	let textConcatVideosIds = '';

        	for ( var i = 0; i < responseVideos.length; i++ ) {
        		textConcatVideosIds += responseVideos[i].id.videoId+ ",";
        	}

        	apiStatistics.id = textConcatVideosIds;

        	const { baseUrlStatistics, partStatistics, orderStatistics, id, maxResultsStatistics, keyStatistics } = apiStatistics;
  			const urlStatistics = `${baseUrlStatistics}part=${partStatistics}&id=${id}&maxResults=${maxResultsStatistics}&key=${keyStatistics}`;

  			axios
	        .get(urlStatistics)
	        .then(res => {
	        	let responseStatistics = res.data.items;
	          	commit("SET_VIDEOS_LIST_AND_STATISTICS", {responseStatistics, nextPage, prevPage});
	        })
	        .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },

    FETCH_PREV_PAGE: ({ commit }, prev) => {

    	apiUrl.prevPageToken = prev;

    	const { baseUrl, part, type, order, maxResults, q, key, prevPageToken } = apiUrl;
		const apiUrlVideos = `${baseUrl}part=${part}&type=${type}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${prevPageToken}`;

		axios
        .get(apiUrlVideos)
        .then(res => {

            let nextPage = res.data.nextPageToken;
        	let prevPage = res.data.prevPageToken

        	let responseVideos = res.data.items;
        	let textConcatVideosIds = '';

        	for ( var i = 0; i < responseVideos.length; i++ ) {
        		textConcatVideosIds += responseVideos[i].id.videoId+ ",";
        	}

        	apiStatistics.id = textConcatVideosIds;

        	const { baseUrlStatistics, partStatistics, orderStatistics, id, maxResultsStatistics, keyStatistics } = apiStatistics;
  			const urlStatistics = `${baseUrlStatistics}part=${partStatistics}&id=${id}&maxResults=${maxResultsStatistics}&key=${keyStatistics}`;

  			axios
	        .get(urlStatistics)
	        .then(res => {
	        	let responseStatistics = res.data.items;
	          	commit("SET_VIDEOS_LIST_AND_STATISTICS", {responseStatistics, nextPage, prevPage});
	        })
	        .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },

    FETCH_CLEAN_STATE_RESULTS_LIST: ({commit}) => {
        commit('SET_CLEAN_STATE_RESULTS_LIST');
    }
}