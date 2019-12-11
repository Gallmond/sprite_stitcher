

dd_button.addEventListener('click', (e)=>{

	dd_content.style.display = ( dd_content.style.display != 'block' ? 'block' : 'none' );

});

dd_input.addEventListener('keyup', (e)=>{

	let searchterm = e.target.value;
	let elements = dd_content.querySelectorAll('a');
	elements.forEach(element => {
		if(element.dataset.search.indexOf( searchterm ) != -1){
			element.style.display = 'block'
		}else{
			element.style.display = 'none'
		}
	});
	

})


{/* <style>
	#dd_content{
		display: none;
		position: absolute;
	}

	#dd_content a{
		display: none;
	}
</style>
<div id="dd_container">
	<button id="dd_button">button</button>
	<div id="dd_content">
		<input type="text" id="dd_input">
		<a data-search="aaa">aaa</a>
		<a data-search="bbb">bbb</a>
		<a data-search="ccc">ccc</a>
		<a data-search="ddd">ddd</a>
	</div>
</div> */}

class SearchableDropDown{

	containing_div;
	data;

	constructor(div_id, key_val_data){

		this.containing_div = document.getElementById( div_id );
		this.data = key_val_data;

		this.createElements();

	}

	createElements(){

		let button = document.createElement('button');
		button.innerText = 'Enter existing thread'

		let content = document.createElement('div');

		let input = document.createElement('input');
		input.type = 'text';

		for(let property in this.data){
			
		}


	}

}