class helpers{

	colour_distance_types = {
		0: 'Euclidean',
		1: 'CIE76',
		2: 'CIE94',
		3: 'CIEDE2000',
		4: 'CMC l:c (1984)'
	}

	static RGB2Hex(rgb_arr){
		let R = rgb_arr[0].toString(16);
		let G = rgb_arr[1].toString(16);
		let B = rgb_arr[2].toString(16);
		R = (R.length!=2 ? "0" : "") + String(R);
		G = (G.length!=2 ? "0" : "") + String(G);
		B = (B.length!=2 ? "0" : "") + String(B);
		return `${R}${G}${B}`;
	}

	static Hex2RGB(hex_str){
		let A = hex_str.split('');
		let R = A.splice(0,2).join('');
		let R_int = parseInt(R, 16);
		let G = A.splice(0,2).join('');
		let G_int = parseInt(G, 16);
		let B = A.splice(0,2).join('');
		let B_int = parseInt(B, 16);
		return [R_int, G_int, B_int];
	}

	static colourDistance(rgb_arr_1, rgb_arr_2, method=0){
		if(method===0){ // Euclidean
			return Math.sqrt(
				((rgb_arr_2[0] - rgb_arr_1[0]) * (rgb_arr_2[0] - rgb_arr_1[0])) +
				((rgb_arr_2[1] - rgb_arr_1[1]) * (rgb_arr_2[1] - rgb_arr_1[1])) + 
				((rgb_arr_2[2] - rgb_arr_1[2]) * (rgb_arr_2[2] - rgb_arr_1[2]))
			)
		}

		return false;
	}

}