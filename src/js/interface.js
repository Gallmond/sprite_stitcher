class interfaceClass{

	elements = {
		'input_canvas' : false,
		'generate_list_button' : false,
		'select_image_button' : false,
		'colour_output' : false,
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
			
		});

	}

}