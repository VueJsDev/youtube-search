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
								<th class="text-center">Channel</th>
								<th class="text-center">Videos</th>
								<th class="text-center">Views</th>
								<th class="text-center">Suscribers</th>
								<th class="text-center">Published</th>
							</tr>
						</thead>
						<tbody v-if="status">
							<tr class="text-center" v-for="channels in completeListChannels">
								<td style="width: 20px;"><input type="checkbox" v-model="channelsIds" :value="channels.id" @change='updateCheckall()'></td>
								<td style="width: 50px;">
									<img :src="channels.snippet.thumbnails.default.url" alt="">
								</td>
								<td style="width: 250px;">
									<br>
									{{ channels.snippet.title }} <br><br>
									<a class="btn btn-default btn-xs custom" :href="'https://www.youtube.com/channel/' + channels.id" target="_blank" role="button" style="margin-right: 5px;">
										<i class="fa fa-television"></i> <label class="text-light-blue"> Visit Channel </label> 
									</a>

									<btn v-popover.hover="{title:'Keywords', content: channels.brandingSettings.channel.keywords}" type="default" size="xs" style="margin-right: 5px;">
										<i class="fa fa-tags"></i>
									</btn>
									<btn v-popover.hover="{title:'Descriptions', content: channels.brandingSettings.channel.description}" type="default" size="xs" style="margin-right: 5px;">
										<i class="fa fa-info-circle"></i>
									</btn>
									
								</td>
								<td style="width: 40px;"><br> {{ channels.statistics.videoCount | separator }}</td>
								<td style="width: 40px;"><br> {{ channels.statistics.viewCount | separator }}</td>
								<td style="width: 40px;"><br> {{ channels.statistics.subscriberCount | separator }}</td>
								<td style="width: 60px;"><br> {{ channels.snippet.publishedAt | formatDate }}</td>
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
				<appModalDetails :dataDetailsUrls="dataChannelsCompleteIds" :showModal="showModalDetails" @clearListUrl="clearListUrl"/>
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
				channelsIds: [],
				dataChannelsCompleteIds: [],
				enableButton: true,
				enableButtonSelectAll: true,
				showModalDetails: false,
				enableButtonCleanResults: false,
			}
		},

		methods: {

			...mapActions('channel', ['FETCH_CLEAN_STATE_RESULTS_LIST']),

			selectAll() {

				this.channelsIds = [];
				this.allSelected =! this.allSelected;
				this.enableButton = true;

	            if (this.allSelected) {
	                for (let url in this.completeListChannels) {
	                    this.channelsIds.push(this.completeListChannels[url].id);
	                }
	                this.enableButton = false;
	            }
			},

		 	updateCheckall(){
		      	if(this.channelsIds.length && this.completeListChannels.length){
		         	this.allSelected = true;
		         	this.enableButton = false;
		      	}else{
		         	this.allSelected = false;
		         	this.enableButton = true;
		      	}
		    },

			showModalVideosWithIds(){

				let urlYoutube = 'https://www.youtube.com/channel/';
				this.showModalDetails = true;
				for ( let url in this.channelsIds) {
			        var urlComplete = urlYoutube + this.channelsIds[url];
			        this.dataChannelsCompleteIds.push(urlComplete);
		      	}
			},

			cleanListResultsTable() {
				this.FETCH_CLEAN_STATE_RESULTS_LIST();
				this.enableButtonCleanResults = false
				this.enableButton = true
				this.allSelected = false
			},

			clearListUrl() {
		      this.dataChannelsCompleteIds = [];
		    },

			prevPage() {
		      this.$emit('prevPage');
		    },

		    nextPage() {
		      this.$emit('nextPage');
		    },

		},

		props: ['completeListChannels', 'status', 'nextPagination', 'prevPagination'],

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