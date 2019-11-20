class appClass{

	elements = {
		'input_canvas' : false,
		'colour_output' : false,
		'controls_area' : false,
		
		// 'generate_list_button' : false,
		// 'select_image_button' : false,
		
		// 'distance_calculator' : false,
		// 'colour_distance' : false,

		
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

		// create ui elements
		this.createElements();

		// create canvas instance
		this.spriteCanvas = new spriteCanvasClass( this.elements.input_canvas );

		// set button listeners
		this.setListeners();

	}


	createElements = (e)=>{

		let to_add = [];

		// === file select <input type="file" name="select_file" id="select_image_button">
		let file_select = document.createElement('input')
		file_select.id = "select_image_button";
		file_select.name = "select_file";
		file_select.type = "file";
		to_add.push( file_select );

		// === distance_calculator
		let CHECKED = 2;
		let DISABLED = [1,3,4]
		let distance_calculator_container = document.createElement('div');
		for(let i in helpers.colour_distance_types){
			let id = `colour_dist_alg_${i}`;

			let distance_calculator_radio = document.createElement('input');
			distance_calculator_radio.id = id;
			distance_calculator_radio.name = "colour_dist_alg";
			distance_calculator_radio.type = "radio";
			distance_calculator_radio.value = i;
			if(i === CHECKED) distance_calculator_radio.checked = true;
			if(DISABLED.indexOf( parseInt(i) ) != -1) distance_calculator_radio.disabled = true;

			let label = document.createElement('label');
			label.innerText = helpers.colour_distance_types[i];
			label.setAttribute('for', id);

			let br = document.createElement('br');

			distance_calculator_container.appendChild(distance_calculator_radio);
			distance_calculator_container.appendChild(label);
			distance_calculator_container.appendChild(br);
		}
		to_add.push( distance_calculator_container );

		// === current distance slider
		let slider_container = document.createElement('div');
		let span = document.createElement('span');
		span.innerHTML = '<span>Distance: <span id="current_distance">30</span></span><br>';
		let colour_distance_input = document.createElement('input'); 
		colour_distance_input.id = "colour_distance" ;
		colour_distance_input.type = "range" ;
		colour_distance_input.min = "1" ;
		colour_distance_input.max = "50" ;
		colour_distance_input.value = "30" ;
		colour_distance_input.step = "1" ;
		colour_distance_input.addEventListener('input', (e)=>{
			document.getElementById('current_distance').innerText = e.target.value;
		});
		slider_container.appendChild(span);
		slider_container.appendChild(colour_distance_input);
		to_add.push( slider_container );

		// === generate list button
		let generate_list_button = document.createElement('button');
		generate_list_button.id = 'generate_list_button';
		generate_list_button.innerText = "Generate list";
		to_add.push( generate_list_button );

		// set ref
		this.elements.generate_list_button = generate_list_button;
		this.elements.select_image_button = file_select;
		this.elements.distance_calculator = distance_calculator_container;
		this.elements.colour_distance = colour_distance_input;

		// ==== add to page
		to_add.forEach((item)=>{
			this.elements.controls_area.appendChild( item );
		})


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