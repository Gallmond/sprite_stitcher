class SearchableDropDown{

	containing_div;
	content;
	button;

	data;

	constructor(div_id, key_val_data){

		this.containing_div = document.getElementById( div_id );
		this.data = this.checkData(key_val_data);



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


	toggleStayVisible(elem){
		elem.dataset.stayvisible = elem.dataset.stayvisible === 'true' ? 'false' : 'true';
		if(elem.dataset.stayvisible === 'true'){
			elem.style.backgroundColor = 'red';
		}else{
			elem.style.backgroundColor = '';
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
		this.content.style.position = 'absolute'

		let input = document.createElement('input');
		input.type = 'text';
		input.addEventListener('keyup',(e)=>{
			let divs = this.content.querySelectorAll('div');
			divs.forEach((elem)=>{
				if(elem.dataset.search.indexOf( e.target.value ) != -1){
					elem.style.display = 'block';
				}else{
					if(elem.dataset.stayvisible != 'true'){
						elem.style.display = 'none';
					}
				}
			})
		});

		this.content.appendChild(input);
		for(let property in this.data){
			let div = document.createElement('div');
			div.dataset.search = property;
			div.dataset.stayvisible = 'false';
			div.addEventListener('click',(e)=>{
				this.toggleStayVisible(e.target);
			});

			for(let dataName in this.data[property]){
				div.dataset[ dataName ] = this.data[property][ dataName ]; 
			}

			div.style.display = 'block';
			div.innerText = this.data[property].hex;
			this.content.appendChild(div);
		}

		this.containing_div.appendChild(this.button);
		this.containing_div.appendChild(this.content);


	}

}

let testdata = {
	'3713': { 'hex': 'f0c5c1', 'r': 240, 'g': 197, 'b': 193, 'id': '3713', 'name': false },
	'761': { 'hex': 'e6adab', 'r': 230, 'g': 173, 'b': 171, 'id': '761', 'name': false },
	'760': { 'hex': 'd28382', 'r': 210, 'g': 131, 'b': 130, 'id': '760', 'name': false },
	'3712': { 'hex': 'c36967', 'r': 195, 'g': 105, 'b': 103, 'id': '3712', 'name': false },
	'3328': { 'hex': 'ad504f', 'r': 173, 'g': 80, 'b': 79, 'id': '3328', 'name': false },
	'347': { 'hex': '992b2d', 'r': 153, 'g': 43, 'b': 45, 'id': '347', 'name': false },
	'353': { 'hex': 'eeb69f', 'r': 238, 'g': 182, 'b': 159, 'id': '353', 'name': false },
	'352': { 'hex': 'e18a75', 'r': 225, 'g': 138, 'b': 117, 'id': '352', 'name': false },
	'351': { 'hex': 'c75647', 'r': 199, 'g': 86, 'b': 71, 'id': '351', 'name': false },
	'350': { 'hex': 'ba4134', 'r': 186, 'g': 65, 'b': 52, 'id': '350', 'name': false },
	'349': { 'hex': 'b02a28', 'r': 176, 'g': 42, 'b': 40, 'id': '349', 'name': false },
	'817': { 'hex': '9e1d18', 'r': 158, 'g': 29, 'b': 24, 'id': '817', 'name': false },
	'304': { 'hex': '8c1a32', 'r': 140, 'g': 26, 'b': 50, 'id': '304', 'name': false },
	'3833': { 'hex': 'cc707e', 'r': 204, 'g': 112, 'b': 126, 'id': '3833', 'name': false },
	'3832': { 'hex': 'b94959', 'r': 185, 'g': 73, 'b': 89, 'id': '3832', 'name': false },
	'3831': { 'hex': '9c3040', 'r': 156, 'g': 48, 'b': 64, 'id': '3831', 'name': false },
	'777': { 'hex': '731b32', 'r': 115, 'g': 27, 'b': 50, 'id': '777', 'name': false },
	'3801': { 'hex': 'c73638', 'r': 199, 'g': 54, 'b': 56, 'id': '3801', 'name': false },
	'666': { 'hex': 'b51b18', 'r': 181, 'g': 27, 'b': 24, 'id': '666', 'name': false },
	'321': { 'hex': '981424', 'r': 152, 'g': 20, 'b': 36, 'id': '321', 'name': false },
	'498': { 'hex': '7d1a2f', 'r': 125, 'g': 26, 'b': 47, 'id': '498', 'name': false },
	'816': { 'hex': '831d2b', 'r': 131, 'g': 29, 'b': 43, 'id': '816', 'name': false },
	'815': { 'hex': '621e2b', 'r': 98, 'g': 30, 'b': 43, 'id': '815', 'name': false },
	'814': { 'hex': '5d1f2f', 'r': 93, 'g': 31, 'b': 47, 'id': '814', 'name': false },
}


const dd = new SearchableDropDown('jsddtest', testdata);