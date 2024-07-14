const MainManager = (function () {
	return {
		canvas: 0,
		// font: 0,

		preload() {
			// font = loadFont('../../css/OpenSans-Regular-webfont.otf');

			DOMManager.preload();
		},

		setup() {
			// pixelDensity(1);
			const size = Math.min(windowWidth, windowHeight)

			this.canvas = createCanvas(size, size);
			this.canvas.position(0, 0);

			// textFont('Helvetica');
			textFont('Open Sans');

			DOMManager.setup();
			ProcessManager.setup();
		},

		draw(dt) {
			// textFont('Open Sans');
			ProcessManager.draw(dt);
		}
	}
})();