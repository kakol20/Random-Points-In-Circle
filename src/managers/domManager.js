const DOMManager = (function () {
	let restartButton = 0;

	return {
		preload() {
			restartButton = createButton('Restart');
			restartButton.mousePressed(() => {
				ProcessManager.changeState('init');
			});
		},

		setup() {
			if (windowWidth > width) {
				restartButton.position(width + 5, 5);
			} else {
				restartButton.position(5, height + 5);
			}
		}
	}
})()