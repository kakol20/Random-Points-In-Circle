const DOMManager = (function () {
	let maxCountText = 0;
	let maxPointsText = 0;

	return {
		restartButton: 0,
		maxCountInput: 0,
		maxPointsInput: 0,
		colorCheckbox: 0,

		preload() {
			this.restartButton = createButton('Restart');
			this.restartButton.mousePressed(() => {
				ProcessManager.changeState('init');
			});

			maxCountText = createSpan('Points/Frame');
			this.maxCountInput = createInput(30000, 'number');
			this.maxCountInput.size(75, this.maxCountInput.height);

			maxPointsText = createSpan('Max Points');
			this.maxPointsInput = createInput(30000, 'number');
			this.maxPointsInput.size(75, this.maxPointsInput.height);

			this.colorCheckbox = createCheckbox(' Use Colour', false);
		},

		setup() {
			const xPos = windowWidth > width ? width + 5 : 5;
			let yPos = windowWidth > width ? 5 : height + 5;

			this.restartButton.position(xPos, yPos);
			yPos += this.restartButton.height + 10;

			maxCountText.position(xPos, yPos + 5);
			this.maxCountInput.position(xPos + maxCountText.width + 20, yPos);
			yPos += Math.max(this.maxCountInput.height, maxCountText.height) + 10;

			maxPointsText.position(xPos, yPos);
			this.maxPointsInput.position(xPos + maxPointsText.width + 20, yPos);
			yPos += Math.max(maxPointsText.height, this.maxPointsInput.height) + 10;

			this.colorCheckbox.position(xPos, yPos);
			yPos += this.colorCheckbox.height + 10;
		}
	}
})()