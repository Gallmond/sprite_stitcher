(function() {
	console.log('scripts.js');

	const spriteCanvas = new spriteCanvasClass('input_canvas');



	// set button handlers
	let selectImageButton = document.getElementById('select_image_button');
	selectImageButton.addEventListener('change',(e)=>{
		let files = e.target.files;
		if(files.length != 1){
			console.log('select a file');
			return;
		}else{
			spriteCanvas.loadImage(files[0]);
		}
	});


 
})();