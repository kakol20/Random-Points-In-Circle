const DOMManager = (function () {
	let maxCountText = 0;
	let maxPointsText = 0;
	let pointAlphaText = 0;
	let randomText = 0;

	return {
		restartButton: 0,
		maxCountInput: 0,
		maxPointsInput: 0,
		colorCheckbox: 0,
		pointAlphaInput: 0,
		randomSelect: 0,

		preload() {
			this.restartButton = createButton('Restart');
			this.restartButton.mousePressed(() => {
				ProcessManager.changeState('init');
			});

			maxCountText = createSpan('Points/Frame');
			this.maxCountInput = createInput(30000, 'number');
			this.maxCountInput.attribute('min', 1);
			this.maxCountInput.attribute('max', (~0) >>> 0);

			maxPointsText = createSpan('Max Points');
			this.maxPointsInput = createInput(30000, 'number');
			this.maxPointsInput.attribute('min', 1);
			this.maxPointsInput.attribute('max', (~0) >>> 0);
			this.colorCheckbox = createCheckbox(' Use Colour', false);

			pointAlphaText = createSpan('Points Transparency');
			pointAlphaText.attribute('title', 'A value between 0 and 255');
			this.pointAlphaInput = createInput(64, 'number');
			this.pointAlphaInput.attribute('min', 0);
			this.pointAlphaInput.attribute('max', 255);

			randomText = createSpan('RNG Algorithm');
			this.randomSelect = createSelect();
			this.randomSelect.option('PCG');
			this.randomSelect.option('LCG');
			this.randomSelect.option('LFSR');
			// randomText.size(AUTO, this.randomSelect.size().height);
			this.randomSelect.selected('PCG');
		},

		setup() {
			const xPos = windowWidth > width ? width + 5 : 5;
			let yPos = windowWidth > width ? 5 : height + 5;

			this.restartButton.position(xPos, yPos);
			yPos += this.restartButton.height + 10;

			maxCountText.position(xPos, yPos);
			this.maxCountInput.position(xPos + maxCountText.size().width + 20, yPos);
			yPos += Math.max(this.maxCountInput.height, maxCountText.height) + 10;

			maxPointsText.position(xPos, yPos);
			this.maxPointsInput.position(xPos + maxPointsText.size().width + 20, yPos);
			yPos += Math.max(maxPointsText.height, this.maxPointsInput.height) + 10;

			this.colorCheckbox.position(xPos, yPos);
			yPos += this.colorCheckbox.height + 10;

			pointAlphaText.position(xPos, yPos);
			this.pointAlphaInput.position(xPos + pointAlphaText.size().width + 25, yPos);
			yPos += Math.max(pointAlphaText.height, this.pointAlphaInput.height) + 10;

			randomText.position(xPos, yPos);
			this.randomSelect.position(xPos + randomText.size().width + 15, yPos);
			yPos += Math.max(randomText.height, this.randomSelect.height) + 10;

		}
	}
})()