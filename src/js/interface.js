class interfaceClass{

	elements = {
		'input_canvas' : false,
		'generate_list_button' : false,
		'select_image_button' : false,
		'colour_output' : false,
		'brand_select' : false,
		'colour_distance' : false,
	}

	spriteCanvas;

	constructor(element_ids){
		// check all inputs		
		let keys = Object.keys( this.elements );
		for(let propName in element_ids){
			if(keys.indexOf(propName)==-1){
				throw new Error(`missing ${propName} in interface constructor`);
			}else{
				this.elements[ propName ] = document.getElementById(element_ids[ propName ]);
			}
		}

		// TODO check elements exist
		
		// create canvas instance
		this.spriteCanvas = new spriteCanvasClass( this.elements.input_canvas );
		
		// set button listeners
		this.setListeners();

	}

	setListeners = ()=>{

		// select image button
		this.elements.select_image_button.addEventListener('change',(e)=>{
			let files = e.target.files;
			if(files.length != 1){
				console.log('select a file');
				return;
			}else{
				this.spriteCanvas.loadImage(files[0]);
			}
		});

		// generate list button
		this.elements.generate_list_button.addEventListener('click', (e)=>{
			let colours = this.spriteCanvas.countColours();
			if(colours) this.createTableFromColours(colours);
		});

	}


	createTableFromColours = (colours)=>{
		console.log('colours', colours);

		// put into array sorted by count
		let sorted = [];
		for(let hex in colours){
			colours[ hex ]['hex'] = hex;
			sorted.push(colours[ hex ]);
		}
		sorted.sort((a,b)=>{
            if(a.count > b.count) return -1;
            if(a.count < b.count) return +1;
            if(a.count == b.count) return 0;
		});
		console.log('sorted', sorted);

		// get nearby brand colours	
		for(let i=0, l=sorted.length; i<l; i++){
			let thiscol = sorted[i];

			sorted[i]['similar'] = 

		}

		// create HTML
		let ul = document.createElement('ul');

		sorted.forEach(details => {
			let li = document.createElement('li');
			li.innerText = `hex[${details.hex}] count[${details.count}]`;
			ul.appendChild(li);
		});

		// add to table
		this.elements['colour_output'].appendChild(ul);

	}




}