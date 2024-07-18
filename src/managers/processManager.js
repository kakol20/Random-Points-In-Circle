const ProcessManager = (function () {
	function DrawPoint(center = { x: 0, y: 0 }, radius = 1, chosen = { x: 0, y: 0 }, p5Color = color('white')) {
		const pos = {
			x: center.x + (chosen.x * radius),
			y: center.y + (chosen.y * radius)
		};

		p5Color.setAlpha(100);

		strokeWeight(1.5);
		stroke(p5Color);
		point(pos.x, pos.y);
	}

	function DrawLabel(center = { x: 0, y: 0 }, radius = 1, label = '') {
		strokeWeight(2.5);
		stroke(86, 192);
		noFill();
		ellipseMode(CENTER);
		circle(center.x, center.y, radius * 2);

		strokeWeight(3);
		textSize(15);
		stroke(24, 192);
		fill(255);
		textAlign(CENTER, TOP);
		text(label, center.x, center.y - radius);
	}

	let state = 'nothing';

	const maxFPS = 75;
	Timing.maxTime = 1000 / maxFPS;

	const debugStates = true;

	let universalSeed = new Date() / 1.;

	let count = 0;
	let maxPoints = 30000;

	let canvasSize = 0;

	let offset = { x: 0, y: 0, radius: 0};
	const padding = 10;

	let useColor = false;

	function RejectionState() {
		Timing.start();

		const center = {
			x: offset.radius,
			y: offset.radius
		};

		// DrawCircle(center, radius);

		while (true) {
			let chosen = {
				x: (Random.randFloat() * 2) - 1,
				y: (Random.randFloat() * 2) - 1
			};

			while (chosen.x * chosen.x + chosen.y * chosen.y > 1) {
				chosen.x = (Random.randFloat() * 2) - 1;
				chosen.y = (Random.randFloat() * 2) - 1;
			}

			let lab = useColor ? new OkLab(0.75, chosen.x * 0.32, chosen.y * 0.32) : new OkLab(1, 0, 0);
			lab.fallback(true);

			DrawPoint(center, offset.radius - padding, chosen, lab.p5Color);

			count++;
			Timing.iterateCount();
			if (count >= maxPoints) {
				Random.seed = universalSeed >>> 0;
				count = 0;
				
				DrawLabel(center, offset.radius - padding, 'Rejection Sampling');

				ProcessManager.changeState('polarUnmodfied');
				break;
			}

			if (Timing.checkTime()) break;
		}
	}

	function PolarUnmodifiedState() {
		Timing.start();

		const center = {
			x: offset.radius + 2 * offset.x,
			y: offset.radius
		};

		while (true) {
			const angle = Random.randFloat() * Math.PI * 2;
			const length = Random.randFloat();

			const chosen = {
				x: length * Math.cos(angle),
				y: length * Math.sin(angle)
			};

			let lch = useColor ? new OkLCh(0.75, length * 0.32, angle) : new OkLCh(1, 0, 0);
			lch.fallback(true);

			DrawPoint(center, offset.radius - padding, chosen, lch.p5Color);

			count++;
			Timing.iterateCount();
			if (count >= maxPoints) {
				Random.seed = universalSeed >>> 0;
				count = 0;

				DrawLabel(center, offset.radius - padding, 'Polar Unmodified');

				ProcessManager.changeState('polarSqrt');
				break;
			}

			if (Timing.checkTime()) break;
		}
	}

	function PolarSqrtState() {
		Timing.start();

		const center = {
			x: offset.radius + offset.x,
			y: offset.radius + offset.y
		};

		while (true) {
			const angle = Random.randFloat() * Math.PI * 2;
			const length = Math.sqrt(Random.randFloat());

			const chosen = {
				x: length * Math.cos(angle),
				y: length * Math.sin(angle)
			};

			let lch = useColor ? new OkLCh(0.75, length * 0.32, angle) : new OkLCh(1, 0, 0);
			lch.fallback(true);

			DrawPoint(center, offset.radius - padding, chosen, lch.p5Color);

			count++;
			Timing.iterateCount();
			if (count >= maxPoints) {
				Random.seed = universalSeed >>> 0;
				count = 0;

				DrawLabel(center, offset.radius - padding, 'Inverse Transform\nSampling');

				ProcessManager.changeState('infTriangle');
				break;
			}

			if (Timing.checkTime()) break;
		}
	}

	function InfTriangleState() {
		Timing.start();

		const center = {
			x: offset.radius,
			y: offset.radius + 2 * offset.y
		};


		while (true) {
			const angle = Random.randFloat() * Math.PI * 2;

			let length = Random.randFloat() + Random.randFloat();
			length = length >= 1 ? length = 2 - length : length;

			const chosen = {
				x: length * Math.cos(angle),
				y: length * Math.sin(angle)
			};

			let lch = useColor ? new OkLCh(0.75, length * 0.32, angle) : new OkLCh(1, 0, 0);
			lch.fallback(true);

			DrawPoint(center, offset.radius - padding, chosen, lch.p5Color);

			count++;
			Timing.iterateCount();
			if (count >= maxPoints) {
				Random.seed = universalSeed >>> 0;
				count = 0;

				DrawLabel(center, offset.radius - padding, 'Infinite Triangle\nSampling');

				ProcessManager.changeState('maxSample');
				break;
			}

			if (Timing.checkTime()) break;
		}
	}

	function MaxSampleState() {
		Timing.start();

		const center = {
			x: offset.radius + 2 * offset.x,
			y: offset.radius + 2 * offset.y
		};

		while (true) {
			const angle = Random.randFloat() * Math.PI * 2;

			let length = Random.randFloat();
			const x = Random.randFloat();

			length = x > length ? x : length;

			const chosen = {
				x: length * Math.cos(angle),
				y: length * Math.sin(angle)
			};

			let lch = useColor ? new OkLCh(0.75, length * 0.32, angle) : new OkLCh(1, 0, 0);
			lch.fallback(true);

			DrawPoint(center, offset.radius - padding, chosen, lch.p5Color);

			count++;
			Timing.iterateCount();
			if (count >= maxPoints) {
				Random.seed = universalSeed >>> 0;
				count = 0;

				DrawLabel(center, offset.radius - padding, 'Max Sampling');

				ProcessManager.changeState('end');
				break;
			}

			if (Timing.checkTime()) break;
		}
	}

	return {
		changeState(s) {
			state = s;

			if (debugStates) console.log('State Change: ' + s);
		},

		setup() {
			this.changeState('init');

			canvasSize = width;

			// const diagonalLength = Math.sqrt(canvasSize * canvasSize + canvasSize * canvasSize) / 6;
			// offset.x = (diagonalLength * Math.SQRT2) / 2;
			// offset.y = offset.x;
			const L = 2 + 2 * Math.SQRT2;
			offset.radius = canvasSize / L;
			offset.x = offset.radius * Math.SQRT2;
			offset.y = offset.x;
		},

		draw(dt) {
			switch (state) {
				case 'init':
					background(28);
					// universalSeed = 1708614304 >>> 0; // for testing - an example of a bad seed
					universalSeed = (new Date() * 1) >>> 0;
					Random.seed = universalSeed >>> 0;
					console.log('Seed set to', universalSeed);

					Timing.maxCount = DOMManager.maxCountInput.value() * 1;
					maxPoints = DOMManager.maxPointsInput.value() * 1;

					useColor = DOMManager.colorCheckbox.checked();

					count = 0;

					this.changeState('rejection');
					break;
				case 'rejection':
					RejectionState();
					break;
				case 'polarUnmodfied':
					PolarUnmodifiedState();
					break;
				case 'polarSqrt':
					PolarSqrtState();
					break;
				case 'infTriangle':
					InfTriangleState();
					break;
				case 'maxSample':
					MaxSampleState();
					break;
				default:
					// do nothing
					break;
			}
		}
	}
})()