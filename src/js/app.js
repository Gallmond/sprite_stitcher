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
			if(i == CHECKED) distance_calculator_radio.checked = true;
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
		generate_list_button.innerText = "Get colours";
		to_add.push( generate_list_button );

		// === show text list
		let copy_list_button = document.createElement('button');
		copy_list_button.innerText = 'Make list';
		copy_list_button.addEventListener('click', (e)=>{
			this.copyList();
		});
		to_add.push(copy_list_button);

		// === highlight closest
		let highlight_closest_button = document.createElement('button');
		highlight_closest_button.innerText = 'Highlight nearest';
		highlight_closest_button.addEventListener('click', (e)=>{
			this.highlightClosest();
		});
		to_add.push(highlight_closest_button);

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

	/**
	 * Sets the active colour for each sublist to the first one.
	 *
	 * @memberof appClass
	 */
	highlightClosest = ()=>{
		console.log('highlightClosest');

		// get every sublist
		let sublists_containers = document.querySelectorAll('.sublist_container');

		sublists_containers.forEach((elem)=>{
			// get first sublist item's colour square and click it
			let this_sublist_item = elem.querySelector('.sublist_item > .colour_square');

			// if it already has active_highlight, skip it
			let isActive = false;
			let this_classlist = this_sublist_item.classList;
			for(let propName in this_classlist){
				if( this_classlist[propName] === 'active_highlight'){
					isActive = true;
				}
			}

			if(!isActive) this_sublist_item.click();
		});
	}

	highlight = (colour_square)=>{
		let active = (colour_square.dataset.active === 'true');
		let replaces = colour_square.dataset.replaces;
		let hex = colour_square.dataset.hex;
		
		if(active){ // already active, so set the replace to the original colour (ie, turning it off)
			hex = replaces;
		}else{ // not yet active, turn off all other active ones
			let other_active = document.querySelectorAll(`.colour_replace[data-active="true"][data-replaces="${replaces}"]`);
			for(let i=0, l=other_active.length; i<l; i++){
				let thisElement = other_active[i];	
				if(thisElement == colour_square) continue;
				thisElement.dataset.active = false;
				thisElement.classList.remove('active_highlight');
			}

		}

		this.spriteCanvas.highlight(replaces, hex).then((resolved, rejected)=>{
			if(rejected){
				console.log('this.spriteCanvas.highlight rejected', rejected);
			}else{
				if(active){
					colour_square.dataset.active = String(!active);
					colour_square.classList.remove('active_highlight');
				}else{
					colour_square.dataset.active = String(!active);
					colour_square.classList.add('active_highlight');
				}
				
			}
		});
	}

	copyList = ()=>{

		if(!this.spriteCanvas.sourceImage){
			alert('no image selected');
			return false;
		}

		// get all active colour squares
		let colour_squares = document.querySelectorAll('span.colour_square[data-active="true"]');
		let rows = [];
		for(let i=0, l=colour_squares.length; i<l; i++){
			let thisElement = colour_squares[i];
			let colour_id = thisElement.dataset.id;
			let colour_hex = thisElement.dataset.hex;
			let colour_brand = thisElement.dataset.brand;
			let colour_name = thisElement.dataset.name;
			let colour_count = thisElement.dataset.count;

			console.log('colour_id', colour_id);
			console.log('colour_hex', colour_hex);
			console.log('colour_brand', colour_brand);
			console.log('colour_name', colour_name);
			console.log('colour_count', colour_count);

			colour_name = (colour_name=='false' ? '' : colour_name);

			rows.push(`${colour_count} stitches of ${colour_brand} (${colour_id}) ${colour_name}`);
		}

		let rows_string = rows.join('\r\n');
		let text = document.createElement('textarea');
		text.value = rows_string;
		document.body.appendChild(text);
		text.select();
		text.setSelectionRange(0, rows_string.length); /*For mobile devices*/
		let methodExists = document.execCommand("copy");
		text.remove();
		if(methodExists){
			alert("Copied to clipboard:\r\n" + rows_string);	
		}else{
			alert('Browser does not support execCommand("copy")');
		}
		


	};


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
			li.classList.add( "list_item" );
			// <li class="list_item"><span class="colour_square" style="background-color:#ffe0a3"></span>#ffe0a3 used 73 pixels</li>
			let info = `<span class="colour_square" style="background-color:#${item.hex}"></span>#${item.hex} ${item.count} pixels`;
			li.innerHTML = info;
			to_append.push(li);

			// loop through floss similar to this colour
			if(item.similar.length != 0 ){
				let ul_container = document.createElement('li');
				ul_container.className = "list_item sublist_container";
				let sub_ul = document.createElement('ul');
				ul_container.appendChild(sub_ul);
				// for (let i = 0; i < item.similar.length; i++) {
				for(let i=0, l=item.similar.length; i<l; i++){

					let this_similar = item.similar[i];
					let sub_li = document.createElement('li');
					sub_li.className = "list_item sublist_item";
					let colour_square = document.createElement('span');
					colour_square.dataset.replaces = item.hex;
					colour_square.dataset.hex = this_similar.hex;
					colour_square.dataset.active = false;

					colour_square.dataset.brand = this_similar.brand;
					colour_square.dataset.name = this_similar.name;
					colour_square.dataset.id = this_similar.id;
					colour_square.dataset.count = item.count;

					colour_square.classList.add("colour_square");
					colour_square.classList.add("colour_replace");
					if(i === 0){
						colour_square.classList.add("first_colour");
					}
					colour_square.style.backgroundColor = `#${this_similar.hex}`;
					colour_square.addEventListener('click', (e)=>{
						this.highlight(e.target);						
					});

					let info = document.createElement('span');
					info.innerText = `#${this_similar.hex} ${this_similar.brand} [${this_similar.id}]${(this_similar.name ? ' '+this_similar.name : '')} distance(${this_similar.distance.toFixed(2)})`;
					
					// let info = `<span data-replaces="${item.hex}" data-hex="${this_similar.hex}" class="colour_square" style="background-color:#${this_similar.hex}"></span>#${this_similar.hex} ${this_similar.brand} [${this_similar.id}]${(this_similar.name ? ' '+this_similar.name : '')} distance(${this_similar.distance.toFixed(2)})`;
					// sub_li.innerHTML = info;
					sub_li.appendChild(colour_square);
					sub_li.appendChild(info);

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