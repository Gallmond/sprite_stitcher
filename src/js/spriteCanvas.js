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
		let depth = 4;

		console.log('this.sourceImage.imageData', this.sourceImage.imageData);


		if(source_image_aspect > canvas_aspect){ // fit to WIDTH
			console.log('fit to width');
			var new_pixel_size = Math.floor( this.canvas.width / this.sourceImage.width );
		}else{ // fit to HEIGHT
			console.log('fit to height');
			var new_pixel_size = Math.floor( this.canvas.height / this.sourceImage.height );
		}

		console.log('new_pixel_size', new_pixel_size);

		let new_width = this.sourceImage.width * new_pixel_size;
		let new_height = this.sourceImage.height * new_pixel_size;

		// expand width
        let new_arr = [];
        for (let i = 0; i < this.sourceImage.imageData.data.length; i += depth) {
            let pixel = this.sourceImage.imageData.data.slice(i, i + depth); // [R,G,B,A]
            for (let ii = 0; ii < new_pixel_size; ii++) {
                new_arr.push(...pixel);
            }
		}
		console.log('new_arr', new_arr);
		

        // expand height
        let new_arr_two = [];
        for (let i = 0; i < new_arr.length; i += new_width * depth) {
            let this_line = new_arr.slice(i, i + (new_width * depth));
            for (let ii = 0; ii < new_pixel_size; ii++) {
                new_arr_two.push(...this_line);
            }
		}

		console.log('new_arr_two', new_arr_two);
		
		// create new image
		let new_uint8 = new Uint8ClampedArray(new_arr_two);
		console.log(new_uint8, new_width, new_height);
		let new_ImageData = new ImageData(new_uint8, new_width, new_height);
		createImageBitmap(new_ImageData).then((res, rej) => {
            if (rej) console.log(rej);
            if (res) console.log(res);
			// put new in display canvas
			let x = (this.canvas.width - res.width) / 2
			let y = (this.canvas.height - res.height) / 2

            this.ctx.drawImage(res, x, y);
        });


	}

}