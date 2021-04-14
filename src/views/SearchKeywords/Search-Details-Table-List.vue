<template>
	<div class="row">
		<div class="col-md-12">
			<div class="box box-primary">
				<div class="box-header with-border">
					<Icons color="info" icon="fa-globe" title="SEARCH RESULTS"/>
					<div class="box-tools pull-right">
						<appButton typebutton="primary" :enableButton="enableButton" textButton="Get Url" size="sm" @click="showModalVideosWithIds" icons="fa-link" data-toggle="modal" data-target="#modalDetails" style="margin-right: 5px;"/>
				        <appButton typebutton="warning" v-if="showButtonCleanResults" textButton="Clear Results" size="sm" @click="cleanListResultsTable" icons="fa-refresh"/>
	             	</div>
	             	<appButtonSelect @click="selectAll" v-if="showButtonSelectAll"/>
				</div>
				<div class="box-body">
					<table class="table table-bordered">
						<thead>
							<tr>
								<th class="text-center">Select All</th>
								<th class="text-center"></th>
								<th class="text-center">Video</th>
								<th class="text-center">Views</th>
								<th class="text-center"><i class="fa fa-thumbs-o-up"></i></th>
								<th class="text-center"><i class="fa fa-thumbs-o-down"></i></th>
								<th class="text-center"><i class="fa fa-commenting-o"></i></th>
								<th class="text-center">Date Published</th>
							</tr>
						</thead>
						<tbody v-if="status">
							<tr class="text-center" v-for="videos in completeListVideos">
								<td style="width: 20px;"><input type="checkbox" v-model="videosIds" :value="videos.id" @change='updateCheckall()'></td>
								<td style="width: 50px;">
									<img :src="videos.snippet.thumbnails.default.url" alt="">
								</td>
								<td style="width: 250px;">
									<br>
									{{ videos.snippet.title }} <br><br>
									<a class="btn btn-default btn-xs custom" :href="'https://www.youtube.com/channel/' + videos.snippet.channelId" target="_blank" role="button" style="margin-right: 5px;">
										<i class="fa fa-television"></i> <label class="text-light-blue"> {{ videos.snippet.channelTitle }}</label> 
									</a>

									<a class="btn btn-default btn-xs custom" :href="'https://www.youtube.com/watch?v=' + videos.id" target="_blank" role="button" style="margin-right: 5px;">
										<i class="fa fa-film"></i> <label class="text-light-blue">Play</label> 
									</a>

									<btn v-popover.hover="{title:'Tags', content: videos.snippet.tags}" type="default" size="xs" style="margin-right: 5px;">
										<i class="fa fa-tags"></i>
									</btn>
									<btn v-popover.hover="{title:'Descriptions',viewport:'#popover-viewport', content: videos.snippet.description}" type="default" size="xs" style="margin-right: 5px;">
										<i class="fa fa-info-circle"></i>
									</btn>
									
								</td>
								<td style="width: 40px;"><br> {{ videos.statistics.viewCount | separator }}</td>
								<td style="width: 40px;"><br> {{ videos.statistics.likeCount | separator }}</td>
								<td style="width: 40px;"><br> {{ videos.statistics.dislikeCount | separator }}</td>
								<td style="width: 40px;"><br> {{ videos.statistics.commentCount | separator }}</td>
								<td style="width: 60px;"><br> {{ videos.snippet.publishedAt | formatDate }}</td>
							</tr>
						</tbody>
						<tbody v-else>
							<br>
							<tr>
						        <td colspan="9" style="border: hidden; background-color: #FFF3CD;">
									<center><strong> <i class="fa fa-exclamation-triangle"></i> No search done yet!</strong></center>
						        </td>
						    </tr>
						</tbody>
					</table>
				</div>
				<Pagination :nextPagination="nextPagination" :prevPagination="prevPagination" @nextPage="nextPage" @prevPage="prevPage"/>
				<appModalDetails :dataDetailsUrls="dataVideosCompleteIds" :showModal="showModalDetails" @clearListUrl="clearListUrl"/>
			</div>
		</div>
	</div>
</template>

<script>

	import { mapActions, mapState, mapGetters} from 'vuex';
	
	import Icons from '../../components/utils/Icons.vue';
	import AppButton from '../../components/utils/Buttons.vue'
	import AppButtonSelect from '../../components/utils/Button-Select.vue'
	import AppModalDetails from '../../components/utils/modalDetails.vue'
	import Pagination from '../../components/utils/Pagination.vue'

	export default {
		name: 'SearchDetailsTableList',

		data() {
			return {
				allSelected: false,
				videosIds: [],
				dataVideosCompleteIds: [],
				enableButton: true,
				enableButtonSelectAll: true,
				showModalDetails: false,
				enableButtonCleanResults: false,
			}
		},

		methods: {

			...mapActions('videos', ['FETCH_CLEAN_STATE_RESULTS_LIST']),

			selectAll() {

				this.videosIds = [];
				this.allSelected =! this.allSelected;
				this.enableButton = true;

	            if (this.allSelected) {
	                for (let url in this.completeListVideos) {
	                    this.videosIds.push(this.completeListVideos[url].id);
	                }
	                this.enableButton = false;
	            }
			},

		 	updateCheckall(){
		      	if(this.videosIds.length && this.completeListVideos.length){
		         	this.allSelected = true;
		         	this.enableButton = false;
		      	}else{
		         	this.allSelected = false;
		         	this.enableButton = true;
		      	}
		    },

			showModalVideosWithIds(){

				let urlYoutube = 'https://www.youtube.com/watch?v=';
				this.showModalDetails = true;
				for ( let url in this.videosIds) {
			        var urlComplete = urlYoutube + this.videosIds[url];
			        this.dataVideosCompleteIds.push(urlComplete);
		      	}
			},

			cleanListResultsTable() {
				this.FETCH_CLEAN_STATE_RESULTS_LIST();
				this.enableButtonCleanResults = false
				this.enableButton = true
				this.allSelected = false
			},

			clearListUrl() {
		      this.dataVideosCompleteIds = [];
		    },

			prevPage() {
		      this.$emit('prevPage');
		    },

		    nextPage() {
		      this.$emit('nextPage');
		    },

		},

		props: ['completeListVideos', 'status', 'nextPagination', 'prevPagination'],

		components: {
			Icons,
			AppButton,
			AppButtonSelect,
			AppModalDetails,
			Pagination
		},

		computed: {
			showButtonCleanResults(){
				if (this.status) {
					return this.enableButtonCleanResults = true;
				} else {
					return this.enableButtonCleanResults = false
				}
			},
			showButtonSelectAll(){
				if (this.status) {
					return this.enableButtonSelectAll = true;
				} else {
					return this.enableButtonSelectAll = false;
				}
			}
		}
	};
</script>

<style >
	.custom { width: auto; height: 22px !important; }
	#popover-viewport { width: 300px; height: 200px !important; }
</style>