import axios from "axios";
import state from './state.js'

let apiUrl = {
	baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
    part: 'id,snippet',
    type: 'channel',
    //order: 'videoCount',
    maxResults: '',
    q: '',
    key: 'AIzaSyAuc9S4fEC3oGMoLJbUQdV0SZ7KIon4vf8',
    //key: 'AIzaSyBdgAYC6bjc0U90msoR15V03nBfvj6MN9o',
    /*prevPageToken: '',
    nextPageToken: ''*/
}

let apiStatistics = {
    baseUrlStatistics: 'https://www.googleapis.com/youtube/v3/channels?',
    partStatistics: 'statistics,snippet,brandingSettings',
    //partStatistics: 'statistics,snippet,contentDetails',
    keyStatistics: 'AIzaSyAuc9S4fEC3oGMoLJbUQdV0SZ7KIon4vf8',
    //keyStatistics: 'AIzaSyBdgAYC6bjc0U90msoR15V03nBfvj6MN9o',
    maxResultsStatistics: '',
    //orderStatistics: 'videoCount',
    id: ''
  }

export default {

	FETCH_LOADING_STATUS: ({ commit }) => {
		commit('SET_LOADING_STATUS', true)
	},

    FETCH_LOADING_STATUS_GIF: ({ commit }) => {
        commit('SET_LOADING_STATUS_GIF', true)
    },

	FETCH_LIST_CHANNELS: ({ commit }, data) => {

      	apiUrl.q = data.keyword;
      	apiUrl.maxResults = data.results;

      	apiStatistics.maxResultsStatistics = data.results;

	  	const { baseUrl, part, type,  maxResults, q, key } = apiUrl;
		const apiUrlChannel = `${baseUrl}part=${part}&type=${type}&q=${q}&maxResults=${maxResults}&key=${key}`;

		axios
        .get(apiUrlChannel)
        .then(res => {

        	let nextPage = res.data.nextPageToken;
        	let prevPage = res.data.prevPageToken

        	let responseChannels = res.data.items;
        	let textConcatIds = '';

        	for ( var i = 0; i < responseChannels.length; i++ ) {
        		textConcatIds += responseChannels[i].id.channelId+ ",";
        	}

        	apiStatistics.id = textConcatIds;

        	const { baseUrlStatistics, partStatistics, orderStatistics, id, maxResultsStatistics, keyStatistics } = apiStatistics;
  			const urlStatistics = `${baseUrlStatistics}part=${partStatistics}&id=${id}&maxResults=${maxResultsStatistics}&key=${keyStatistics}`;

        	axios
	        .get(urlStatistics)
	        .then(res => {
	        	let responseStatistics = res.data.items;
                console.log('responseStatistics', responseStatistics)
	          	commit("SET_CHANNEL_LIST_AND_STATISTICS", {responseStatistics, nextPage, prevPage});
                commit('SET_LOADING_STATUS_GIF', false);
	        })
	        .catch(error => console.log(error));
        })
        .catch(error => console.log(error))
    },

    FETCH_NEXT_PAGE: ({ commit }, next) => {

    	apiUrl.nextPageToken = next;

    	const { baseUrl, part, type, order, maxResults, q, key, nextPageToken } = apiUrl;
		const apiUrlChannel = `${baseUrl}part=${part}&type=${type}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;

		axios
        .get(apiUrlChannel)
        .then(res => {

        	let nextPage = res.data.nextPageToken;
        	let prevPage = res.data.prevPageToken

        	let responseChannels = res.data.items;
        	let textConcatIds = '';

        	for ( var i = 0; i < responseChannels.length; i++ ) {
        		textConcatIds += responseChannels[i].id.channelId+ ",";
        	}

        	apiStatistics.id = textConcatIds;

        	const { baseUrlStatistics, partStatistics, orderStatistics, id, maxResultsStatistics, keyStatistics } = apiStatistics;
  			const urlStatistics = `${baseUrlStatistics}part=${partStatistics}&id=${id}&maxResults=${maxResultsStatistics}&key=${keyStatistics}`;

  			axios
	        .get(urlStatistics)
	        .then(res => {
	        	let responseStatistics = res.data.items;
	          	commit("SET_CHANNEL_LIST_AND_STATISTICS", {responseStatistics, nextPage, prevPage});
	        })
	        .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },

    FETCH_PREV_PAGE: ({ commit }, prev) => {

    	apiUrl.prevPageToken = prev;

    	const { baseUrl, part, type, order, maxResults, q, key, prevPageToken } = apiUrl;
		const apiUrlChannel = `${baseUrl}part=${part}&type=${type}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${prevPageToken}`;

		axios
        .get(apiUrlChannel)
        .then(res => {

        	let nextPage = res.data.nextPageToken;
        	let prevPage = res.data.prevPageToken

        	let responseChannels = res.data.items;
        	let textConcatIds = '';

        	for ( var i = 0; i < responseChannels.length; i++ ) {
        		textConcatIds += responseChannels[i].id.channelId+ ",";
        	}

        	apiStatistics.id = textConcatIds;

        	const { baseUrlStatistics, partStatistics, orderStatistics, id, maxResultsStatistics, keyStatistics } = apiStatistics;
  			const urlStatistics = `${baseUrlStatistics}part=${partStatistics}&id=${id}&maxResults=${maxResultsStatistics}&key=${keyStatistics}`;

  			axios
	        .get(urlStatistics)
	        .then(res => {
	        	let responseStatistics = res.data.items;
	          	commit("SET_CHANNEL_LIST_AND_STATISTICS", {responseStatistics, nextPage, prevPage});
	        })
	        .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },

    FETCH_CLEAN_STATE_RESULTS_LIST: ({commit}) => {
        commit('SET_CLEAN_STATE_RESULTS_LIST');
    }
}