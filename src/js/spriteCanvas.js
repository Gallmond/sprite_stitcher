class sourceImageClass{
	imageData;
	src;
	width;
	height;
	image;
	constructor(){}
	load = (src_url)=>{
		return new Promise((resolve,reject)=>{
			this.src = src_url;
			this.image = new Image();
			this.image.onerror = (e)=>{
				return reject(e);
			}
			this.image.onload = (e)=>{
				let temp_canvas = document.createElement('canvas')
				temp_canvas.getContext('2d').drawImage(e.target, 0, 0);
				this.width = e.target.width;
				this.height = e.target.height;
				this.imageData = temp_canvas.getContext('2d').getImageData(0, 0, e.target.width, e.target.height);
				return resolve(this);
			}
			this.image.src = src_url;
		});
	}
}


class spriteCanvasClass{

	canvas;
	ctx;
	sourceImage;
	sourceImageData;

	constructor(canvas_id){
		this.canvas = document.getElementById(canvas_id);
		this.ctx = this.canvas.getContext('2d');
		this.init();
	}

	init = ()=>{
		// set canvas size
		let setCanvasSize = ()=>{
			this.canvas.width = this.canvas.parentNode.offsetWidth;
			this.canvas.height = this.canvas.parentNode.offsetHeight;
		}
		setCanvasSize();
		window.addEventListener('resize', setCanvasSize)
		this.canvas.style.backgroundColor = 'rgb(136, 68, 68)';
	}

// foobar
	loadImage = (file)=>{
		console.log('loadImage', file);
		let fileReader = new FileReader();
		fileReader.onerror = (e)=>{
			throw e;
		}
		fileReader.onload = (e)=>{
			console.log('fileReader.onload', e);
			this.sourceImage = new sourceImageClass();
			this.sourceImage.load( e.target.result ).then((resolved, rejected)=>{
				if(rejected) console.log('rejected', rejected);
				console.log('resolved', resolved);
				this.ctx.drawImage( resolved.image, 0, 0 );
				this.renderImage();
			});
		}
		fileReader.readAsDataURL( file );

	}


	renderImage = ()=>{
		console.log('renderImage');

		// take the source image pixels, and resize pixels to fit in the canvas
		let canvas_aspect = this.canvas.width / this.canvas.height;
		let source_image_aspect = this.sourceImage.width / this.sourceImage.height;

		if(source_image_aspect > canvas_aspect){ // fit to WIDTH
			console.log('fit to width');
		}else{ // fit to HEIGHT
			console.log('fit to height');
		}

	}

}