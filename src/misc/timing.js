const Timing = (function () {
	let startTime = 0;
	let count = 0;
	return {
		maxTime: 0,
		maxCount: 0,
		start() {
			startTime = new Date();
			count = 0;
		},
		iterateCount() {
			count++;
		},
		checkTime() {
			const elapseTime = (new Date()) - startTime;
			// if (elapseTime >= maxTime) break;
			return (elapseTime >= this.maxTime) || (count >= this.maxCount);
		}
	}
})();