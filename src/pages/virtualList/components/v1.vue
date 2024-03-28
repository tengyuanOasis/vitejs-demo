<template>
	<div
		class="container"
		ref="list"
		@scroll="handleScroll()"
	>
		<div
			class="phantom"
			:style="{ height: listHeight + 'px' }"
		/>
		<div
			class="list"
			:style="{ transform: getTransform }"
		>
			<div
				ref="items"
				class="list-item"
				v-for="item in visibleData"
				:key="item.id"
				:style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
			>
				{{ item.value }}
			</div>
		</div>
	</div>
</template>
<script>
	// 需要接收listData以及每个列表项的高度
	export default {
		name: 'VirtualList',
		props: {
			listData: {
				type: Array,
				default: () => []
			},
			itemSize: {
				type: Number,
				default: 200
			}
		},
		data() {
			return {
				// 可视区域高度
				screenHeight: 0,
				// 偏移量
				startOffset: 0,
				// 开始索引
				start: 0,
				// 结束索引
				end: null
			};
		},
		computed: {
			// 列表总高度
			listHeight() {
				return this.listData.length * this.itemSize;
			},
			// 可显示的列表数目
			visibleCount() {
				// Math.ceil向上取整
				return Math.ceil(this.screenHeight / this.itemSize);
			},
			// 获取渲染区数据
			visibleData() {
				// 兼容数据不足一屏的情况
				return this.listData.slice(this.start, Math.min(this.end, this.listData.length));
			},
			// 偏移量对应的style
			getTransform() {
				return `translate3d(0,${this.startOffset}px,0)`;
			}
		},
		mounted() {
			this.screenHeight = this.$el.clientHeight;
			this.start = 0;
			this.end = this.start + this.visibleCount;
		},

		methods: {
			// 监听scroll，获取滚动位置scrollTop
			handleScroll() {
				let scrollTop = this.$refs.list.scrollTop;
				this.start = Math.floor(scrollTop / this.itemSize);
				this.end = this.start + this.visibleCount;
				this.startOffset = scrollTop - (scrollTop % this.itemSize);
				console.log('scrollTop', scrollTop);
				console.log('startOffset', this.startOffset);
				this.scrolling = false; // 重置滚动标志
			}
		}
	};
</script>
<style scoped>
	.container {
		width: 100%;
		height: 100%;
		overflow: auto;
		position: relative;
	}
	.phantom {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		z-index: -1;
	}
	.list {
		left: 0;
		right: 0;
		top: 0;
		position: absolute;
		text-align: center;
	}
	.list-item {
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid black;
	}
</style>
