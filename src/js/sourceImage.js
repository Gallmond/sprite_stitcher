class sourceImageClass{
	imageData;
	src;
	width;
	height;
	image;
	depth;
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
				this.depth = this.imageData.data.length / (this.width * this.height);
				return resolve(this);
			}
			this.image.src = src_url;
		});
	}
	/**
	 * return object of couted colours
	 *
	 * @memberof sourceImageClass
	 */
	countColours = ()=>{
		if(!this.imageData) return false;
		let data = this.imageData.data;
		// count pixels
		let counted_pixels = {};
		for(let i=0, l=data.length; i<l; i+= this.depth){
			let pixel = data.slice(i, i+this.depth);
			if(pixel[3]!=255) continue; // skip transparent
			let hex = helpers.RGB2Hex(pixel);
			if(!counted_pixels[ hex ]){
				counted_pixels[ hex ] = {
					'indexes' : [ i ],
					'count' : 1
				}
			}else{
				counted_pixels[ hex ].indexes.push( i );
				counted_pixels[ hex ].count++;
			}
		}
		return counted_pixels;
	}
}