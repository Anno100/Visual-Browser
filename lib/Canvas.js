let check_Canvas = setInterval(() => {
	if (true) {
		Canvas = class Canvas {

			Draw = () => { }
			constructor(width = 500, height = 500, parent = document.getElementsByClassName('t-Body-contentInner')[0]) {
				this.width = width;
				this.height = height;
				this.parent = parent;
				this.DOM = document.createElement('canvas');
				this.DOM.width = width;
				this.DOM.height = height;
				parent.appendChild(this.DOM);

				this.g = this.DOM.getContext("2d");



				this.INTERVAL = setInterval(() => {
					this.Draw();
				});
			}

			resetInterval = (msec) => {
				clearInterval(this.INTERVAL);
				this.INTERVAL = setInterval(() => {
					this.Draw();
				}, msec);
			}

			pixlength = 20;

			setResolution = (width, height = null) => {

				if (!height) height = width;

				this.width = width;
				this.height = height;
				this.DOM.width = width;
				this.DOM.height = height;
			}


			drawGrid = (color = null) => {

				if (color) this.g.strokeStyle = color;
				for (let i = 1; i * this.pixlength < this.height; i++) {
					this.g.beginPath()
					this.g.moveTo(0, i * this.pixlength);
					this.g.lineTo(this.width, i * this.pixlength);
					this.g.stroke();
				}
				for (let i = 0; i * this.pixlength < this.width; i++) {
					this.g.beginPath()
					this.g.moveTo(i * this.pixlength, 0);
					this.g.lineTo(i * this.pixlength, this.height);
					this.g.stroke();
				}
			}

			fillPixel = (x, y, color = null) => {
				if (color) this.g.fillStyle = color;
				this.g.fillRect(x * this.pixlength, y * this.pixlength, this.pixlength, this.pixlength);
			}

			clear = () => {
				this.g.clearRect(0, 0, this.width, this.height);
			}
			fill = (color) => {
				this.g.fillStyle = color;
				this.g.fillRect(0, 0, this.width, this.height);
			}

			fillRect = (x, y, width, height, color = null) => {
				if (color) this.g.fillStyle = color;
				this.g.fillRect(x * this.pixlength, y * this.pixlength, width * this.pixlength, height * this.pixlength);
			}



		}
		load_Canvas = true;
		clearInterval(check_Canvas);
	}
	else {
		console.log('wait');
	}
}, 1);