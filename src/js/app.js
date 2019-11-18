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

		// TODO change dist calc to CREATE the inputs, do not rely on layout
		// check element types
		if( this.elements.input_canvas.tagName != 'CANVAS' ) throw new Error('input_canvas must be a canvas element');
		if( this.elements.generate_list_button.tagName != 'BUTTON' ) throw new Error('generate_list_button must be a button element');
		if( this.elements.select_image_button.tagName != 'INPUT' ) throw new Error('select_image_button must be a input element');
		if( this.elements.colour_output.tagName != 'DIV' ) throw new Error('colour_output must be a div element');
		if( this.elements.distance_calculator.tagName != 'DIV' ) throw new Error('distance_calculator must be a div element');
		if( this.elements.colour_distance.tagName != 'INPUT' ) throw new Error('colour_distance must be a input element');
	
		// create ui elements
		this.createElements();

		// create canvas instance
		this.spriteCanvas = new spriteCanvasClass( this.elements.input_canvas );

		// set button listeners
		this.setListeners();

	}

	// TODO create entire input area
	createElements = (e)=>{

		// distance_calculator
		let checked_index = 0; // which one to pre-check?
		let disabled_index = [1,3,4]; // which ones to disable?

		let h4 = document.createElement('h4');
		h4.innerText = 'Colour distance algorithm';

		this.elements.distance_calculator.appendChild(h4);

		for(let i in helpers.colour_distance_types){
			let id = `colour_dist_alg_${i}`;

			let input = document.createElement('input');
			input.id = id;
			input.name = "colour_dist_alg";
			input.type = "radio";
			input.value = i;
			if(i == checked_index) input.checked = true;
			if(disabled_index.indexOf(parseInt(i))!=-1) input.disabled = true;

			let label = document.createElement('label');
			label.innerText = helpers.colour_distance_types[i];
			label.setAttribute('for', id);

			let br = document.createElement('br');

			this.elements.distance_calculator.appendChild(input);
			this.elements.distance_calculator.appendChild(label);
			this.elements.distance_calculator.appendChild(br);
		}
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
			sorted[i]['similar'] = floss.similar( sorted[i].hex, this.elements.colour_distance.value, this.getSelectedColourDistanceMethod() ); 
		}

		// create HTML
		let ul = document.createElement('ul');

		sorted.forEach(item => {
			let to_append = [];

			// item for the pixel in the image
			let li = document.createElement('li');
			li.className = "list_item";
			// <li class="list_item"><span class="colour_square" style="background-color:#ffe0a3"></span>#ffe0a3 used 73 pixels</li>
			let info = `<span class="colour_square" style="background-color:#${item.hex}"></span>#${item.hex} ${item.count} pixels`;
			li.innerHTML = info;
			to_append.push(li);

			// loop through floss similar to this colour
			if(item.similar.length != 0 ){
				let ul_container = document.createElement('li');
				ul_container.className = "list_item";
				let sub_ul = document.createElement('ul');
				ul_container.appendChild(sub_ul);
				// for (let i = 0; i < item.similar.length; i++) {
				for(let i=0, l=item.similar.length; i<l; i++){

					let this_similar = item.similar[i];
					let sub_li = document.createElement('li');
					sub_li.className = "list_item";
					// <li class="list_item"><span class="colour_square" style="background-color:#ffe19a"></span>#ffe19a dmc [745] distance(9.06)</li>
					let info = `<span class="colour_square" style="background-color:#${this_similar.hex}"></span>#${this_similar.hex} ${this_similar.brand} [${this_similar.id}]${(this_similar.name ? ' '+this_similar.name : '')} distance(${this_similar.distance.toFixed(2)})`;
					sub_li.innerHTML = info;
					sub_ul.appendChild(sub_li);
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