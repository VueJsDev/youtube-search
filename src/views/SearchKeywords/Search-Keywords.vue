<template>
	<section class="content">
		<div class="row">
			<div class="col-md-12">
				<div class="box box-primary">
					<div class="box-header with-border">
						<Icons color="success" icon="fa-youtube-play" title="SEARCH FOR VIDEOS"/>
					</div>
					<div class="box-body">
						<KeywordsDetails @search="search"/>
					</div>
				</div>
			</div>
		</div>

		<SearchDetailsTableList :status="GET_LOADING_DATA_VIDEOS_AND_STATISTICS" :completeListVideos="GET_VIDEOS_LIST" :nextPagination="GET_NEXT_PAGINATION" :prevPagination="GET_PREV_PAGINATION" @nextPage="nextPage" @prevPage="prevPage"/>

	</section>
</template>

<script>
	
	import { mapActions, mapState, mapGetters} from 'vuex';

	import Icons from '../../components/utils/Icons.vue';
	import KeywordsDetails from './Keywords-Details.vue';
	import SearchDetailsTableList from './Search-Details-Table-List.vue';
	export default {
		name: 'KeywordSearch',
		data() {
			return {
				reformattedSearchString: '',
				data: {
					keyword: '',
					results: ''
				},
				idsChannel: [],
			}
		},
		methods: {
			
			...mapActions('videos', ['FETCH_LIST_VIDEOS', 'FETCH_LOADING_STATUS', 'FETCH_NEXT_PAGE', 'FETCH_PREV_PAGE', 'FETCH_LOADING_STATUS_GIF']),

			search(searchParams) {
				this.reformattedSearchString = searchParams.searchParams.join(' ');
				this.data.keyword = searchParams.searchParams.join('+');
				this.data.results = searchParams.searchMaxResult;
				this.FETCH_LOADING_STATUS_GIF().then(
					setTimeout(() => {
			        	this.FETCH_LIST_VIDEOS(this.data)
					    this.FETCH_LOADING_STATUS();
					}, 3000)
				);
			},

			nextPage() {
				this.FETCH_NEXT_PAGE(this.GET_NEXT_PAGINATION);
			},

			prevPage() {
				this.FETCH_PREV_PAGE(this.GET_PREV_PAGINATION)
			}
		},
		computed: {
	        ...mapGetters('videos', ['GET_LOADING_DATA_VIDEOS_AND_STATISTICS', 'GET_VIDEOS_LIST', 'GET_NEXT_PAGINATION', 'GET_PREV_PAGINATION']),
	    },
		components:{
			Icons,
			KeywordsDetails,
			SearchDetailsTableList
		},
	};
</script>