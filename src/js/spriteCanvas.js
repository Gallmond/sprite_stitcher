class spriteCanvasClass{

	canvas;
	ctx;
	sourceImage;
	resizedBitmap;
	offset_x;
	offset_y;
	depth = 4; // always 4 channels for RGBA
	highlight_colour = [0,255,0,255]// RGBA

	constructor(canvas_element){
		this.canvas = canvas_element;
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
		// window.addEventListener('resize', setCanvasSize)
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
				if(rejected){
					console.log('rejected', rejected);
					throw new Error('the source image failed to load');
				} 
				this.renderImage();
			});
		}
		fileReader.readAsDataURL( file );

	}


	resizeImageForCanvas = (sourceImageData)=>{
		return new Promise((resolve,reject)=>{
		
			// take the source image pixels, and resize pixels to fit in the canvas
			let canvas_aspect = this.canvas.width / this.canvas.height;
			let source_image_aspect = sourceImageData.width / sourceImageData.height;

			// check which way will fill the canvas first and expand to this size pixel only
			if(source_image_aspect > canvas_aspect){ // fit to WIDTH
				console.log('fit to width');
				var new_pixel_size = Math.floor( this.canvas.width / sourceImageData.width );
			}else{ // fit to HEIGHT
				console.log('fit to height');
				var new_pixel_size = Math.floor( this.canvas.height / sourceImageData.height );
			}

			// new full image width from this
			let new_width = sourceImageData.width * new_pixel_size;
			let new_height = sourceImageData.height * new_pixel_size;

			// expand width
			let new_arr = [];
			for (let i = 0; i < sourceImageData.data.length; i += this.depth) {
				let pixel = sourceImageData.data.slice(i, i + this.depth); // [R,G,B,A]
				for (let ii = 0; ii < new_pixel_size; ii++) {
					new_arr.push(...pixel);
				}
			}

			// expand height
			let new_arr_two = [];
			for (let i = 0; i < new_arr.length; i += new_width * this.depth) {
				let this_line = new_arr.slice(i, i + (new_width * this.depth));
				for (let ii = 0; ii < new_pixel_size; ii++) {
					new_arr_two.push(...this_line);
				}
			}

			// create new image
			let new_uint8 = new Uint8ClampedArray(new_arr_two);
			let new_ImageData = new ImageData(new_uint8, new_width, new_height);
			createImageBitmap(new_ImageData).then((res, rej) => {
				if (rej) throw new Error('the image bitmap could not be created');
				if(rej){
					return reject(rej);
				}
				return resolve( res );
			});

		});
	}


	renderImage = ()=>{
		console.log('renderImage');

		this.resizeImageForCanvas( this.sourceImage.imageData ).then((resizedBitmap, rejected)=>{
			if(rejected){ throw new Error('problem resizing image') }
			this.resizedBitmap = resizedBitmap;
			this.offset_x = (this.canvas.width - this.resizedBitmap.width) / 2
			this.offset_y = (this.canvas.height - this.resizedBitmap.height) / 2
			this.ctx.drawImage(this.resizedBitmap, this.offset_x, this.offset_y);
		});

	}


	countColours = ()=>{
		// get colours of image
		let counted_colours = this.sourceImage.countColours();
		console.log('counted_colours', counted_colours);
		return counted_colours;
	}


	// TODO how to highlight
	// use indexes in colour count to replace on new empty image
	// resize and paste onto canvas
	// clicking again clears
	// reset button to set to original

	

}