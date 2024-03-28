export default class VirtualScrollComponent {
	constructor(container, items, itemHeight) {
		this.container = container;
		this.items = items;
		this.itemHeight = itemHeight;
		this.visibleItems = [];
		this.offset = 0;
		this.container.style.position = 'relative';
		this.container.style.overflowY = 'auto';
		this.container.style.height = '200px'; // 可视区域的高度

		// 创建虚拟列表项的DOM元素
		this.virtualItems = items.map(() => {
			const item = document.createElement('div');
			item.style.position = 'absolute';
			item.style.height = `${itemHeight}px`;
			return item;
		});

		// 将虚拟列表项添加到容器中
		this.virtualItems.forEach((item) => this.container.appendChild(item));

		// 监听滚动事件
		this.container.addEventListener('scroll', this.handleScroll.bind(this));
	}

	handleScroll() {
		// 使用requestAnimationFrame来优化渲染
		requestAnimationFrame(() => {
			const scrollTop = this.container.scrollTop;
			this.offset = Math.floor(scrollTop / this.itemHeight);
			this.updateVisibleItems();
		});
	}

	updateVisibleItems() {
		const start = this.offset;
		const end = Math.min(
			start + Math.ceil(this.container.clientHeight / this.itemHeight),
			this.items.length
		);

		// 更新虚拟列表项的位置和显示的内容
		for (let i = 0; i < this.virtualItems.length; i++) {
			const index = start + i;
			if (index < this.items.length) {
				this.virtualItems[i].style.transform = `translateY(${index * this.itemHeight}px)`;
				this.virtualItems[i].textContent = this.items[index].text;
				this.virtualItems[i].style.display = 'block';
			} else {
				this.virtualItems[i].style.display = 'none';
			}
		}
	}

	updateItems(newItems) {
		this.items = newItems;
		this.updateVisibleItems();
	}
}

// 使用示例
// const container = document.getElementById('virtual-scroll-container');
// const items = Array.from({ length: 10000 }, (_, i) => ({ text: `Item ${i + 1}` }));
// new VirtualScrollComponent(container, items, 30);
