class appClass{

	elements = {
		'input_canvas' : false,
		'generate_list_button' : false,
		'select_image_button' : false,
		'colour_output' : false,
		'distance_calculator' : false,
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
			if(!this.spriteCanvas.sourceImage){
				alert('no image selected');
				return false;
			}
			let colours = this.spriteCanvas.countColours();
			if(colours) this.createTableFromColours(colours);
		});

	}

	getSelectedColourDistanceMethod = ()=>{
		return parseInt(this.elements.distance_calculator.querySelector('[name="colour_dist_alg"]:checked').value);
	}


	createTableFromColours = (colours)=>{
		console.log('colours', colours);

		// clear output
		this.elements['colour_output'].innerHTML = "";

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

		// get nearby brand colours	
		for(let i=0, l=sorted.length; i<l; i++){
			let thiscol = sorted[i];
			sorted[i]['similar'] = floss.similar( thiscol.hex, this.elements.colour_distance.value, this.getSelectedColourDistanceMethod() ); 
		}

		// create HTML
		let ul = document.createElement('ul');

		sorted.forEach(details => {
			let to_append = [];

			// details for the pixel in the image
			let li = document.createElement('li');
			li.className = "list_item";
			// <li class="list_item"><span class="colour_square" style="background-color:#ffe0a3"></span>#ffe0a3 used 73 pixels</li>
			let info = `<span class="colour_square" style="background-color:#${details.hex}"></span>#${details.hex} ${details.count} pixels`;
			li.innerHTML = info;
			to_append.push(li);

			// loop through floss similar to this colour
			if(details.similar.count != 0 ){
				let ul_container = document.createElement('li');
				ul_container.className = "list_item";
				let ul = document.createElement('ul');
				ul_container.appendChild(ul);
				for (let i = 0; i < details.similar.length; i++) {
					let this_similar = details.similar[i];
					let li = document.createElement('li');
					li.className = "list_item";
					// <li class="list_item"><span class="colour_square" style="background-color:#ffe19a"></span>#ffe19a dmc [745] distance(9.06)</li>
					let info = `<span class="colour_square" style="background-color:#${this_similar.hex}"></span>#${this_similar.hex} ${this_similar.brand} [${this_similar.id}]${(this_similar.name ? ' '+this_similar.name : '')} distance(${(this_similar.distance).toFixed(2)})`;
					li.innerHTML = info;
					ul.appendChild(li);
				}
				to_append.push(ul_container);
			}

			// collect all the list items
			for (let i = 0; i < to_append.length; i++) {
				ul.appendChild(to_append[i]);
			}
		});

		// add to page
		this.elements['colour_output'].appendChild(ul);
	}




}