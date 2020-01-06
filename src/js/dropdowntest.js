class SearchableDropDown{

	containing_div;
	content;
	button;
	callback;
	items = [];

	data;

	constructor(containing_div, key_val_data, div_click_callback = null){

		this.containing_div = containing_div;
		this.data = this.checkData(key_val_data);
		this.callback = div_click_callback;


		this.createElements();

	}

	checkData(key_val_data){
		// data should be an object where the property is the searchable string, and the valye is an object to be inserted into dataset. with 'label' as the text for div
		if(typeof key_val_data != 'object'){
			throw new Error('key_val_data should be an object')
		}
		for(let property in key_val_data){
			if(typeof key_val_data[property] != 'object'){
				throw new Error('key_val_data should contain objects')
			}
		}
		return key_val_data;
	}

	getActive(){
		let collected = [];
		for(let i=0, l=this.items.length; i<l; i++){
			let this_div = this.items[i];	
			if(this_div.dataset.active === 'true'){
				let info = this_div.dataset;
				if(!collected[ `owned_${info.brand}` ]){
					collected[ `owned_${info.brand}` ] = {};
				}
				let pixel = [ parseInt(info.r), parseInt(info.g), parseInt(info.b) ];
				let hex = helpers.RGB2Hex(pixel);
					// 	'coolbrand':{
					// 		'f0c5c1': { 'r': 240, 'g': 197, 'b': 193, 'id': '3713', 'name': false },
					// 		'e6adab': { 'r': 230, 'g': 173, 'b': 171, 'id': '761', 'name': false }
					// 	},
				collected[ `owned_${info.brand}` ][ hex ] = {
					'r': info.r,
					'g': info.g,
					'b': info.b,
					'id': info.id,
					'name': info.name === 'false' ? false : info.name
				};
			}
		}
		return collected;

	}

	toggleactive(elem){
		elem.dataset.active = elem.dataset.active === 'true' ? 'false' : 'true';
		if(elem.dataset.active === 'true'){
			elem.style.backgroundColor = 'red';
		}else{
			elem.style.backgroundColor = '';
		}
		if(typeof this.callback === 'function'){
			this.callback( elem );
		}
	}

	createElements(){

		this.button = document.createElement('button');
		this.button.innerText = 'Enter existing thread'
		this.button.addEventListener('click', (e)=>{
			this.content.style.display = ( this.content.style.display != 'block' ? 'block' : 'none' );
		});

		this.content = document.createElement('div');
		this.content.style.display = 'none'

		let input = document.createElement('input');
		input.type = 'text';
		input.addEventListener('keyup',(e)=>{
			let divs = this.content.querySelectorAll('div[data-search]');
			divs.forEach((elem)=>{
				if(elem.dataset.search.indexOf( e.target.value ) != -1){
					elem.style.display = '';
				}else{
					if(elem.dataset.active != 'true'){
						elem.style.display = 'none';
					}
				}
			})
		});

		this.content.appendChild(input);
		let list_container = document.createElement('div');
		list_container.id = 'dd_items_container';
		// list_container.style.minHeight = '0px';
		for(let property in this.data){
			let div = document.createElement('div');
			div.dataset.search = property;
			div.dataset.active = 'false';
			div.addEventListener('click',(e)=>{
				this.toggleactive(e.currentTarget);
			});

			for(let dataName in this.data[property]){
				div.dataset[ dataName ] = this.data[property][ dataName ]; 
			}

			div.style.display = 'block';
			div.style.cursor = 'pointer';
			if(typeof this.data[property]._label != 'undefined'){
				div.innerHTML = this.data[property]._label;
			}else{
				div.innerText = property;
			}
			
			this.items.push(div);
			list_container.appendChild(div);
		}

		this.content.appendChild( list_container );

		this.containing_div.appendChild(this.button);
		this.containing_div.appendChild(this.content);
	}

}

// let testdata = {
// 	'3713': { 'hex': 'f0c5c1', 'r': 240, 'g': 197, 'b': 193, 'id': '3713', 'name': false, '_label':'3713 (f0c5c1)' },
// 	'761': { 'hex': 'e6adab', 'r': 230, 'g': 173, 'b': 171, 'id': '761', 'name': false, '_label':'761 (e6adab)' },
// 	'760': { 'hex': 'd28382', 'r': 210, 'g': 131, 'b': 130, 'id': '760', 'name': false, '_label':'760 (d28382)' },
// 	'3712': { 'hex': 'c36967', 'r': 195, 'g': 105, 'b': 103, 'id': '3712', 'name': false, '_label':'3712 (c36967)' },
// 	'3328': { 'hex': 'ad504f', 'r': 173, 'g': 80, 'b': 79, 'id': '3328', 'name': false, '_label':'3328 (ad504f)' },
// 	'347': { 'hex': '992b2d', 'r': 153, 'g': 43, 'b': 45, 'id': '347', 'name': false, '_label':'347 (992b2d)' },
// 	'353': { 'hex': 'eeb69f', 'r': 238, 'g': 182, 'b': 159, 'id': '353', 'name': false, '_label':'353 (eeb69f)' },
// 	'352': { 'hex': 'e18a75', 'r': 225, 'g': 138, 'b': 117, 'id': '352', 'name': false, '_label':'352 (e18a75)' },
// 	'351': { 'hex': 'c75647', 'r': 199, 'g': 86, 'b': 71, 'id': '351', 'name': false, '_label':'351 (c75647)' },
// 	'350': { 'hex': 'ba4134', 'r': 186, 'g': 65, 'b': 52, 'id': '350', 'name': false, '_label':'350 (ba4134)' },
// 	'349': { 'hex': 'b02a28', 'r': 176, 'g': 42, 'b': 40, 'id': '349', 'name': false, '_label':'349 (b02a28)' },
// 	'817': { 'hex': '9e1d18', 'r': 158, 'g': 29, 'b': 24, 'id': '817', 'name': false, '_label':'817 (9e1d18)' },
// 	'304': { 'hex': '8c1a32', 'r': 140, 'g': 26, 'b': 50, 'id': '304', 'name': false, '_label':'304 (8c1a32)' },
// 	'3833': { 'hex': 'cc707e', 'r': 204, 'g': 112, 'b': 126, 'id': '3833', 'name': false, '_label':'3833 (cc707e)' },
// 	'3832': { 'hex': 'b94959', 'r': 185, 'g': 73, 'b': 89, 'id': '3832', 'name': false, '_label':'3832 (b94959)' },
// 	'3831': { 'hex': '9c3040', 'r': 156, 'g': 48, 'b': 64, 'id': '3831', 'name': false, '_label':'3831 (9c3040)' },
// 	'777': { 'hex': '731b32', 'r': 115, 'g': 27, 'b': 50, 'id': '777', 'name': false, '_label':'777 (731b32)' },
// 	'3801': { 'hex': 'c73638', 'r': 199, 'g': 54, 'b': 56, 'id': '3801', 'name': false, '_label':'3801 (c73638)' },
// 	'666': { 'hex': 'b51b18', 'r': 181, 'g': 27, 'b': 24, 'id': '666', 'name': false, '_label':'666 (b51b18)' },
// 	'321': { 'hex': '981424', 'r': 152, 'g': 20, 'b': 36, 'id': '321', 'name': false, '_label':'321 (981424)' },
// 	'498': { 'hex': '7d1a2f', 'r': 125, 'g': 26, 'b': 47, 'id': '498', 'name': false, '_label':'498 (7d1a2f)' },
// 	'816': { 'hex': '831d2b', 'r': 131, 'g': 29, 'b': 43, 'id': '816', 'name': false, '_label':'816 (831d2b)' },
// 	'815': { 'hex': '621e2b', 'r': 98, 'g': 30, 'b': 43, 'id': '815', 'name': false, '_label':'815 (621e2b)' },
// 	'814': { 'hex': '5d1f2f', 'r': 93, 'g': 31, 'b': 47, 'id': '814', 'name': false, '_label':'814 (5d1f2f)' },
// }


// const dd = new SearchableDropDown('jsddtest', testdata);