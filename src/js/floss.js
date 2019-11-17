class floss{

	static similar(hex, max_distance, method=0, brand=false,){
		let similar = [];
		let brands_to_check = {};
		if(brand!=false){
			if(typeof floss.brands[brand] === 'undefined'){
				throw new Error(`Brand ${brand} is not in the list`);
			}
			brands_to_check[ brand ] = floss.brands[ brand ];
		}else{
			brands_to_check = floss.brands;
		}

		for(let brandName in brands_to_check){ // for each brand of floss
			for(let floss_hex in brands_to_check[brandName]){ // for each floss in this brand

				let floss_rgb = helpers.Hex2RGB( floss_hex );
				let input_rgb = helpers.Hex2RGB( hex );

				// get colour distance
				let this_distance = floss.colourDistance( input_rgb, floss_rgb, method );

				// add to list if below max
				if(this_distance <= max_distance){
					let this_floss = brands_to_check[brandName][floss_hex];
					this_floss['hex'] = floss_hex;
					this_floss['distance'] = this_distance;
					this_floss['brand'] = brandName;
					similar.push( this_floss );
				}
			}
		}

		// reorder by distance
		similar.sort((a,b)=>{
			if(a.distance > b.distance) return +1;
			if(a.distance < b.distance) return -1;
			if(a.distance == b.distance) return 0;
		});

		return similar;

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

// static properties must be defined like this
floss.colour_distance_types = {
	0: 'Euclidean',
	1: 'CIE76',
	2: 'CIE94',
	3: 'CIEDE2000',
	4: 'CMC l:c (1984)'
};

floss.brands = {
	'dmc' : {
		'f0c5c1': {'r':240, 'g':197, 'b':193, 'id':'3713', 'name':false},
		'e6adab': {'r':230, 'g':173, 'b':171, 'id':'761', 'name':false},
		'd28382': {'r':210, 'g':131, 'b':130, 'id':'760', 'name':false},
		'c36967': {'r':195, 'g':105, 'b':103, 'id':'3712', 'name':false},
		'ad504f': {'r':173, 'g':80, 'b':79, 'id':'3328', 'name':false},
		'992b2d': {'r':153, 'g':43, 'b':45, 'id':'347', 'name':false},
		'eeb69f': {'r':238, 'g':182, 'b':159, 'id':'353', 'name':false},
		'e18a75': {'r':225, 'g':138, 'b':117, 'id':'352', 'name':false},
		'c75647': {'r':199, 'g':86, 'b':71, 'id':'351', 'name':false},
		'ba4134': {'r':186, 'g':65, 'b':52, 'id':'350', 'name':false},
		'b02a28': {'r':176, 'g':42, 'b':40, 'id':'349', 'name':false},
		'9e1d18': {'r':158, 'g':29, 'b':24, 'id':'817', 'name':false},
		'8c1a32': {'r':140, 'g':26, 'b':50, 'id':'304', 'name':false},
		'cc707e': {'r':204, 'g':112, 'b':126, 'id':'3833', 'name':false},
		'b94959': {'r':185, 'g':73, 'b':89, 'id':'3832', 'name':false},
		'9c3040': {'r':156, 'g':48, 'b':64, 'id':'3831', 'name':false},
		'731b32': {'r':115, 'g':27, 'b':50, 'id':'777', 'name':false},
		'c73638': {'r':199, 'g':54, 'b':56, 'id':'3801', 'name':false},
		'b51b18': {'r':181, 'g':27, 'b':24, 'id':'666', 'name':false},
		'981424': {'r':152, 'g':20, 'b':36, 'id':'321', 'name':false},
		'7d1a2f': {'r':125, 'g':26, 'b':47, 'id':'498', 'name':false},
		'831d2b': {'r':131, 'g':29, 'b':43, 'id':'816', 'name':false},
		'621e2b': {'r':98, 'g':30, 'b':43, 'id':'815', 'name':false},
		'5d1f2f': {'r':93, 'g':31, 'b':47, 'id':'814', 'name':false},
		'f58ea0': {'r':245, 'g':142, 'b':160, 'id':'894', 'name':false},
		'e16577': {'r':225, 'g':101, 'b':119, 'id':'893', 'name':false},
		'e1555f': {'r':225, 'g':85, 'b':95, 'id':'892', 'name':false},
		'd84453': {'r':216, 'g':68, 'b':83, 'id':'891', 'name':false},
		'f4cfcc': {'r':244, 'g':207, 'b':204, 'id':'818', 'name':false},
		'f99cad': {'r':249, 'g':156, 'b':173, 'id':'957', 'name':false},
		'e56182': {'r':229, 'g':97, 'b':130, 'id':'956', 'name':false},
		'f899aa': {'r':248, 'g':153, 'b':170, 'id':'3708', 'name':false},
		'ee7881': {'r':238, 'g':120, 'b':129, 'id':'3706', 'name':false},
		'd0474c': {'r':208, 'g':71, 'b':76, 'id':'3705', 'name':false},
		'f8c6ce': {'r':248, 'g':198, 'b':206, 'id':'963', 'name':false},
		'e7a1b1': {'r':231, 'g':161, 'b':177, 'id':'3716', 'name':false},
		'ce798d': {'r':206, 'g':121, 'b':141, 'id':'962', 'name':false},
		'c46077': {'r':196, 'g':96, 'b':119, 'id':'961', 'name':false},
		'a12f42': {'r':161, 'g':47, 'b':66, 'id':'309', 'name':false},
		'f8e3d9': {'r':248, 'g':227, 'b':217, 'id':'819', 'name':false},
		'e59ba6': {'r':229, 'g':155, 'b':166, 'id':'3326', 'name':false},
		'd16b84': {'r':209, 'g':107, 'b':132, 'id':'899', 'name':false},
		'c2566e': {'r':194, 'g':86, 'b':110, 'id':'335', 'name':false},
		'8e1a37': {'r':142, 'g':26, 'b':55, 'id':'326', 'name':false},
		'e9b5bf': {'r':233, 'g':181, 'b':191, 'id':'151', 'name':false},
		'd79aa7': {'r':215, 'g':154, 'b':167, 'id':'3354', 'name':false},
		'ca7a8d': {'r':202, 'g':122, 'b':141, 'id':'3733', 'name':false},
		'b6556d': {'r':182, 'g':85, 'b':109, 'id':'3731', 'name':false},
		'983651': {'r':152, 'g':54, 'b':81, 'id':'3350', 'name':false},
		'85223a': {'r':133, 'g':34, 'b':58, 'id':'150', 'name':false},
		'f6e2e6': {'r':246, 'g':226, 'b':230, 'id':'23', 'name':false},
		'e7b9c9': {'r':231, 'g':185, 'b':201, 'id':'3689', 'name':false},
		'bd7890': {'r':189, 'g':120, 'b':144, 'id':'3688', 'name':false},
		'a3546f': {'r':163, 'g':84, 'b':111, 'id':'3687', 'name':false},
		'78344f': {'r':120, 'g':52, 'b':79, 'id':'3803', 'name':false},
		'642237': {'r':100, 'g':34, 'b':55, 'id':'3685', 'name':false},
		'eaabc1': {'r':234, 'g':171, 'b':193, 'id':'605', 'name':false},
		'e69ab5': {'r':230, 'g':154, 'b':181, 'id':'604', 'name':false},
		'dd80a0': {'r':221, 'g':128, 'b':160, 'id':'603', 'name':false},
		'c6537b': {'r':198, 'g':83, 'b':123, 'id':'602', 'name':false},
		'b2375e': {'r':178, 'g':55, 'b':94, 'id':'601', 'name':false},
		'a82d56': {'r':168, 'g':45, 'b':86, 'id':'600', 'name':false},
		'd4769b': {'r':212, 'g':118, 'b':155, 'id':'3806', 'name':false},
		'b74a79': {'r':183, 'g':74, 'b':121, 'id':'3805', 'name':false},
		'ad3b68': {'r':173, 'g':59, 'b':104, 'id':'3804', 'name':false},
		'd6a1c8': {'r':214, 'g':161, 'b':200, 'id':'3609', 'name':false},
		'c787ae': {'r':199, 'g':135, 'b':174, 'id':'3608', 'name':false},
		'a75086': {'r':167, 'g':80, 'b':134, 'id':'3607', 'name':false},
		'902e6b': {'r':144, 'g':46, 'b':107, 'id':'718', 'name':false},
		'8f2b64': {'r':143, 'g':43, 'b':100, 'id':'917', 'name':false},
		'6b153d': {'r':107, 'g':21, 'b':61, 'id':'915', 'name':false},
		'845486': {'r':132, 'g':84, 'b':134, 'id':'*33', 'name':false},
		'753169': {'r':117, 'g':49, 'b':105, 'id':'*34', 'name':false},
		'5b1d4c': {'r':91, 'g':29, 'b':76, 'id':'*35', 'name':false},
		'c9a3a6': {'r':201, 'g':163, 'b':166, 'id':'778', 'name':false},
		'c297a3': {'r':194, 'g':151, 'b':163, 'id':'3727', 'name':false},
		'aa788e': {'r':170, 'g':120, 'b':142, 'id':'316', 'name':false},
		'84555d': {'r':132, 'g':85, 'b':93, 'id':'3726', 'name':false},
		'6f4149': {'r':111, 'g':65, 'b':73, 'id':'315', 'name':false},
		'61323e': {'r':97, 'g':50, 'b':62, 'id':'3802', 'name':false},
		'5a242e': {'r':90, 'g':36, 'b':46, 'id':'902', 'name':false},
		'a885a1': {'r':168, 'g':133, 'b':161, 'id':'3836', 'name':false},
		'805a7b': {'r':128, 'g':90, 'b':123, 'id':'3835', 'name':false},
		'5c3654': {'r':92, 'g':54, 'b':84, 'id':'3834', 'name':false},
		'381f34': {'r':56, 'g':31, 'b':52, 'id':'154', 'name':false},
		'e7deef': {'r':231, 'g':222, 'b':239, 'id':'*24', 'name':false},
		'd8d4e5': {'r':216, 'g':212, 'b':229, 'id':'*25', 'name':false},
		'c0c1dd': {'r':192, 'g':193, 'b':221, 'id':'*26', 'name':false},
		'c4bbe2': {'r':196, 'g':187, 'b':226, 'id':'211', 'name':false},
		'b1a2d3': {'r':177, 'g':162, 'b':211, 'id':'210', 'name':false},
		'9c83b8': {'r':156, 'g':131, 'b':184, 'id':'209', 'name':false},
		'78589b': {'r':120, 'g':88, 'b':155, 'id':'208', 'name':false},
		'614588': {'r':97, 'g':69, 'b':136, 'id':'3837', 'name':false},
		'614069': {'r':97, 'g':64, 'b':105, 'id':'327', 'name':false},
		'ccafcc': {'r':204, 'g':175, 'b':204, 'id':'153', 'name':false},
		'ba99bf': {'r':186, 'g':153, 'b':191, 'id':'554', 'name':false},
		'7f609b': {'r':127, 'g':96, 'b':155, 'id':'553', 'name':false},
		'6f4d86': {'r':111, 'g':77, 'b':134, 'id':'552', 'name':false},
		'43265d': {'r':67, 'g':38, 'b':93, 'id':'550', 'name':false},
		'c0b8c1': {'r':192, 'g':184, 'b':193, 'id':'3743', 'name':false},
		'a195a2': {'r':161, 'g':149, 'b':162, 'id':'3042', 'name':false},
		'786572': {'r':120, 'g':101, 'b':114, 'id':'3041', 'name':false},
		'624c57': {'r':98, 'g':76, 'b':87, 'id':'3740', 'name':false},
		'd6d7dd': {'r':214, 'g':215, 'b':221, 'id':'*27', 'name':false},
		'74778a': {'r':116, 'g':119, 'b':138, 'id':'*28', 'name':false},
		'454156': {'r':69, 'g':65, 'b':86, 'id':'*29', 'name':false},
		'bcc6d5': {'r':188, 'g':198, 'b':213, 'id':'3747', 'name':false},
		'90a5c5': {'r':144, 'g':165, 'b':197, 'id':'341', 'name':false},
		'7f94be': {'r':127, 'g':148, 'b':190, 'id':'156', 'name':false},
		'808dc5': {'r':128, 'g':141, 'b':197, 'id':'340', 'name':false},
		'8384bc': {'r':131, 'g':132, 'b':188, 'id':'155', 'name':false},
		'6266a3': {'r':98, 'g':102, 'b':163, 'id':'3746', 'name':false},
		'524f92': {'r':82, 'g':79, 'b':146, 'id':'333', 'name':false},
		'7d83aa': {'r':125, 'g':131, 'b':170, 'id':'*30', 'name':false},
		'586288': {'r':88, 'g':98, 'b':136, 'id':'*31', 'name':false},
		'4c557c': {'r':76, 'g':85, 'b':124, 'id':'*32', 'name':false},
		'9ab5cf': {'r':154, 'g':181, 'b':207, 'id':'157', 'name':false},
		'7d9dbf': {'r':125, 'g':157, 'b':191, 'id':'794', 'name':false},
		'617ba2': {'r':97, 'g':123, 'b':162, 'id':'793', 'name':false},
		'506796': {'r':80, 'g':103, 'b':150, 'id':'3807', 'name':false},
		'3b538b': {'r':59, 'g':83, 'b':139, 'id':'792', 'name':false},
		'314674': {'r':49, 'g':70, 'b':116, 'id':'158', 'name':false},
		'2a396e': {'r':42, 'g':57, 'b':110, 'id':'791', 'name':false},
		'96badc': {'r':150, 'g':186, 'b':220, 'id':'3840', 'name':false},
		'6b8cbe': {'r':107, 'g':140, 'b':190, 'id':'3839', 'name':false},
		'5377b0': {'r':83, 'g':119, 'b':176, 'id':'3838', 'name':false},
		'95bcd7': {'r':149, 'g':188, 'b':215, 'id':'800', 'name':false},
		'7ca5cf': {'r':124, 'g':165, 'b':207, 'id':'809', 'name':false},
		'5f8db6': {'r':95, 'g':141, 'b':182, 'id':'799', 'name':false},
		'3c70ab': {'r':60, 'g':112, 'b':171, 'id':'798', 'name':false},
		'2d4b82': {'r':45, 'g':75, 'b':130, 'id':'797', 'name':false},
		'1c3673': {'r':28, 'g':54, 'b':115, 'id':'796', 'name':false},
		'182d6a': {'r':24, 'g':45, 'b':106, 'id':'820', 'name':false},
		'afd0da': {'r':175, 'g':208, 'b':218, 'id':'162', 'name':false},
		'97c3d8': {'r':151, 'g':195, 'b':216, 'id':'827', 'name':false},
		'6b9fbd': {'r':107, 'g':159, 'b':189, 'id':'813', 'name':false},
		'3d77a2': {'r':61, 'g':119, 'b':162, 'id':'826', 'name':false},
		'24608e': {'r':36, 'g':96, 'b':142, 'id':'825', 'name':false},
		'194774': {'r':25, 'g':71, 'b':116, 'id':'824', 'name':false},
		'25ade5': {'r':37, 'g':173, 'b':229, 'id':'996', 'name':false},
		'0096d0': {'r':0, 'g':150, 'b':208, 'id':'3843', 'name':false},
		'008bc3': {'r':0, 'g':139, 'b':195, 'id':'995', 'name':false},
		'32c4db': {'r':50, 'g':196, 'b':219, 'id':'3846', 'name':false},
		'00b4cf': {'r':0, 'g':180, 'b':207, 'id':'3845', 'name':false},
		'009eb9': {'r':0, 'g':158, 'b':185, 'id':'3844', 'name':false},
		'9dafc3': {'r':157, 'g':175, 'b':195, 'id':'159', 'name':false},
		'778ba6': {'r':119, 'g':139, 'b':166, 'id':'160', 'name':false},
		'566b89': {'r':86, 'g':107, 'b':137, 'id':'161', 'name':false},
		'dfe8e0': {'r':223, 'g':232, 'b':224, 'id':'3756', 'name':false},
		'bad2d7': {'r':186, 'g':210, 'b':215, 'id':'775', 'name':false},
		'aacad7': {'r':170, 'g':202, 'b':215, 'id':'3841', 'name':false},
		'90b8d1': {'r':144, 'g':184, 'b':209, 'id':'3325', 'name':false},
		'76a4c3': {'r':118, 'g':164, 'b':195, 'id':'3755', 'name':false},
		'5989ab': {'r':89, 'g':137, 'b':171, 'id':'334', 'name':false},
		'4c76a1': {'r':76, 'g':118, 'b':161, 'id':'322', 'name':false},
		'2a527a': {'r':42, 'g':82, 'b':122, 'id':'312', 'name':false},
		'1a3e63': {'r':26, 'g':62, 'b':99, 'id':'803', 'name':false},
		'223956': {'r':34, 'g':57, 'b':86, 'id':'336', 'name':false},
		'18273d': {'r':24, 'g':39, 'b':61, 'id':'823', 'name':false},
		'171d2a': {'r':23, 'g':29, 'b':42, 'id':'939', 'name':false},
		'baccd3': {'r':186, 'g':204, 'b':211, 'id':'3753', 'name':false},
		'9db7c4': {'r':157, 'g':183, 'b':196, 'id':'3752', 'name':false},
		'7f98a8': {'r':127, 'g':152, 'b':168, 'id':'932', 'name':false},
		'527287': {'r':82, 'g':114, 'b':135, 'id':'931', 'name':false},
		'354d5c': {'r':53, 'g':77, 'b':92, 'id':'930', 'name':false},
		'224156': {'r':34, 'g':65, 'b':86, 'id':'3750', 'name':false},
		'b5d3d4': {'r':181, 'g':211, 'b':212, 'id':'828', 'name':false},
		'a1cdd4': {'r':161, 'g':205, 'b':212, 'id':'3761', 'name':false},
		'80b3c6': {'r':128, 'g':179, 'b':198, 'id':'519', 'name':false},
		'4b8ea5': {'r':75, 'g':142, 'b':165, 'id':'518', 'name':false},
		'397b9c': {'r':57, 'g':123, 'b':156, 'id':'3760', 'name':false},
		'276a93': {'r':39, 'g':106, 'b':147, 'id':'517', 'name':false},
		'125179': {'r':18, 'g':81, 'b':121, 'id':'3842', 'name':false},
		'1b4361': {'r':27, 'g':67, 'b':97, 'id':'311', 'name':false},
		'bbe4e6': {'r':187, 'g':228, 'b':230, 'id':'747', 'name':false},
		'7cbdc5': {'r':124, 'g':189, 'b':197, 'id':'3766', 'name':false},
		'4a93a2': {'r':74, 'g':147, 'b':162, 'id':'807', 'name':false},
		'196882': {'r':25, 'g':104, 'b':130, 'id':'3765', 'name':false},
		'a8cfcb': {'r':168, 'g':207, 'b':203, 'id':'3811', 'name':false},
		'90bdbb': {'r':144, 'g':189, 'b':187, 'id':'598', 'name':false},
		'639da6': {'r':99, 'g':157, 'b':166, 'id':'597', 'name':false},
		'44848d': {'r':68, 'g':132, 'b':141, 'id':'3810', 'name':false},
		'226b75': {'r':34, 'g':107, 'b':117, 'id':'3809', 'name':false},
		'02555a': {'r':2, 'g':85, 'b':90, 'id':'3808', 'name':false},
		'c1ccc3': {'r':193, 'g':204, 'b':195, 'id':'928', 'name':false},
		'a3b5ad': {'r':163, 'g':181, 'b':173, 'id':'927', 'name':false},
		'6e8382': {'r':110, 'g':131, 'b':130, 'id':'926', 'name':false},
		'496166': {'r':73, 'g':97, 'b':102, 'id':'3768', 'name':false},
		'2f4a50': {'r':47, 'g':74, 'b':80, 'id':'924', 'name':false},
		'5b9f97': {'r':91, 'g':159, 'b':151, 'id':'3849', 'name':false},
		'36847b': {'r':54, 'g':132, 'b':123, 'id':'3848', 'name':false},
		'106057': {'r':16, 'g':96, 'b':87, 'id':'3847', 'name':false},
		'93d4c5': {'r':147, 'g':212, 'b':197, 'id':'964', 'name':false},
		'5ebba6': {'r':94, 'g':187, 'b':166, 'id':'959', 'name':false},
		'42a891': {'r':66, 'g':168, 'b':145, 'id':'958', 'name':false},
		'008f7a': {'r':0, 'g':143, 'b':122, 'id':'3812', 'name':false},
		'3fa784': {'r':63, 'g':167, 'b':132, 'id':'3851', 'name':false},
		'0d9473': {'r':13, 'g':148, 'b':115, 'id':'943', 'name':false},
		'00865e': {'r':0, 'g':134, 'b':94, 'id':'3850', 'name':false},
		'7bb59e': {'r':123, 'g':181, 'b':158, 'id':'993', 'name':false},
		'569d87': {'r':86, 'g':157, 'b':135, 'id':'992', 'name':false},
		'2c7e6c': {'r':44, 'g':126, 'b':108, 'id':'3814', 'name':false},
		'156c58': {'r':21, 'g':108, 'b':88, 'id':'991', 'name':false},
		'9cbf9b': {'r':156, 'g':191, 'b':155, 'id':'966', 'name':false},
		'a5c8a6': {'r':165, 'g':200, 'b':166, 'id':'564', 'name':false},
		'87b594': {'r':135, 'g':181, 'b':148, 'id':'563', 'name':false},
		'5c8864': {'r':92, 'g':136, 'b':100, 'id':'562', 'name':false},
		'436f4c': {'r':67, 'g':111, 'b':76, 'id':'505', 'name':false},
		'9cb8a4': {'r':156, 'g':184, 'b':164, 'id':'3817', 'name':false},
		'6b9680': {'r':107, 'g':150, 'b':128, 'id':'3816', 'name':false},
		'5c806a': {'r':92, 'g':128, 'b':106, 'id':'163', 'name':false},
		'4e7b63': {'r':78, 'g':123, 'b':99, 'id':'3815', 'name':false},
		'39614e': {'r':57, 'g':97, 'b':78, 'id':'561', 'name':false},
		'9eb7a8': {'r':158, 'g':183, 'b':168, 'id':'3813', 'name':false},
		'7e9e90': {'r':126, 'g':158, 'b':144, 'id':'503', 'name':false},
		'698474': {'r':105, 'g':132, 'b':116, 'id':'502', 'name':false},
		'486358': {'r':72, 'g':99, 'b':88, 'id':'501', 'name':false},
		'263930': {'r':38, 'g':57, 'b':48, 'id':'500', 'name':false},
		'acdca9': {'r':172, 'g':220, 'b':169, 'id':'955', 'name':false},
		'afdca2': {'r':175, 'g':220, 'b':162, 'id':'*13', 'name':false},
		'8cc590': {'r':140, 'g':197, 'b':144, 'id':'954', 'name':false},
		'71b57d': {'r':113, 'g':181, 'b':125, 'id':'913', 'name':false},
		'5aa56f': {'r':90, 'g':165, 'b':111, 'id':'912', 'name':false},
		'338c52': {'r':51, 'g':140, 'b':82, 'id':'911', 'name':false},
		'1b783e': {'r':27, 'g':120, 'b':62, 'id':'910', 'name':false},
		'6732': {'r':0, 'g':103, 'b':50, 'id':'909', 'name':false},
		'094d2b': {'r':9, 'g':77, 'b':43, 'id':'3818', 'name':false},
		'c3d0a5': {'r':195, 'g':208, 'b':165, 'id':'369', 'name':false},
		'91a579': {'r':145, 'g':165, 'b':121, 'id':'368', 'name':false},
		'698765': {'r':105, 'g':135, 'b':101, 'id':'320', 'name':false},
		'547251': {'r':84, 'g':114, 'b':81, 'id':'367', 'name':false},
		'29422e': {'r':41, 'g':66, 'b':46, 'id':'319', 'name':false},
		'223b22': {'r':34, 'g':59, 'b':34, 'id':'890', 'name':false},
		'a1bb81': {'r':161, 'g':187, 'b':129, 'id':'164', 'name':false},
		'869a5a': {'r':134, 'g':154, 'b':90, 'id':'989', 'name':false},
		'75894d': {'r':117, 'g':137, 'b':77, 'id':'988', 'name':false},
		'506c40': {'r':80, 'g':108, 'b':64, 'id':'987', 'name':false},
		'365129': {'r':54, 'g':81, 'b':41, 'id':'986', 'name':false},
		'cedc9f': {'r':206, 'g':220, 'b':159, 'id':'772', 'name':false},
		'b3b46d': {'r':179, 'g':180, 'b':109, 'id':'3348', 'name':false},
		'758048': {'r':117, 'g':128, 'b':72, 'id':'3347', 'name':false},
		'5f6e3a': {'r':95, 'g':110, 'b':58, 'id':'3346', 'name':false},
		'3a4e25': {'r':58, 'g':78, 'b':37, 'id':'3345', 'name':false},
		'2d462a': {'r':45, 'g':70, 'b':42, 'id':'895', 'name':false},
		'daeb9d': {'r':218, 'g':235, 'b':157, 'id':'*14', 'name':false},
		'd1d883': {'r':209, 'g':216, 'b':131, 'id':'*15', 'name':false},
		'c1cd59': {'r':193, 'g':205, 'b':89, 'id':'*16', 'name':false},
		'8aa845': {'r':138, 'g':168, 'b':69, 'id':'704', 'name':false},
		'78a24b': {'r':120, 'g':162, 'b':75, 'id':'703', 'name':false},
		'558c3e': {'r':85, 'g':140, 'b':62, 'id':'702', 'name':false},
		'397d3c': {'r':57, 'g':125, 'b':60, 'id':'701', 'name':false},
		'297238': {'r':41, 'g':114, 'b':56, 'id':'700', 'name':false},
		'006232': {'r':0, 'g':98, 'b':50, 'id':'699', 'name':false},
		'a3af31': {'r':163, 'g':175, 'b':49, 'id':'907', 'name':false},
		'6d8b1c': {'r':109, 'g':139, 'b':28, 'id':'906', 'name':false},
		'4e6d20': {'r':78, 'g':109, 'b':32, 'id':'905', 'name':false},
		'476024': {'r':71, 'g':96, 'b':36, 'id':'904', 'name':false},
		'c5bc65': {'r':197, 'g':188, 'b':101, 'id':'472', 'name':false},
		'959049': {'r':149, 'g':144, 'b':73, 'id':'471', 'name':false},
		'7f8637': {'r':127, 'g':134, 'b':55, 'id':'470', 'name':false},
		'606023': {'r':96, 'g':96, 'b':35, 'id':'469', 'name':false},
		'555f27': {'r':85, 'g':95, 'b':39, 'id':'937', 'name':false},
		'4e4f2a': {'r':78, 'g':79, 'b':42, 'id':'936', 'name':false},
		'3f442d': {'r':63, 'g':68, 'b':45, 'id':'935', 'name':false},
		'353926': {'r':53, 'g':57, 'b':38, 'id':'934', 'name':false},
		'878b5e': {'r':135, 'g':139, 'b':94, 'id':'3364', 'name':false},
		'697450': {'r':105, 'g':116, 'b':80, 'id':'3363', 'name':false},
		'505a3d': {'r':80, 'g':90, 'b':61, 'id':'3362', 'name':false},
		'ece7b7': {'r':236, 'g':231, 'b':183, 'id':'*10', 'name':false},
		'ece072': {'r':236, 'g':224, 'b':114, 'id':'*11', 'name':false},
		'dad151': {'r':218, 'g':209, 'b':81, 'id':'*12', 'name':false},
		'd0c768': {'r':208, 'g':199, 'b':104, 'id':'165', 'name':false},
		'cac351': {'r':202, 'g':195, 'b':81, 'id':'3819', 'name':false},
		'a8a21f': {'r':168, 'g':162, 'b':31, 'id':'166', 'name':false},
		'8a8929': {'r':138, 'g':137, 'b':41, 'id':'581', 'name':false},
		'746f2a': {'r':116, 'g':111, 'b':42, 'id':'580', 'name':false},
		'999e82': {'r':153, 'g':158, 'b':130, 'id':'523', 'name':false},
		'93996d': {'r':147, 'g':153, 'b':109, 'id':'3053', 'name':false},
		'7e845c': {'r':126, 'g':132, 'b':92, 'id':'3052', 'name':false},
		'4e522f': {'r':78, 'g':82, 'b':47, 'id':'3051', 'name':false},
		'a7ad8d': {'r':167, 'g':173, 'b':141, 'id':'524', 'name':false},
		'8d987d': {'r':141, 'g':152, 'b':125, 'id':'522', 'name':false},
		'42533c': {'r':66, 'g':83, 'b':60, 'id':'520', 'name':false},
		'b5a04c': {'r':181, 'g':160, 'b':76, 'id':'734', 'name':false},
		'9d8a2f': {'r':157, 'g':138, 'b':47, 'id':'733', 'name':false},
		'76691d': {'r':118, 'g':105, 'b':29, 'id':'732', 'name':false},
		'64591c': {'r':100, 'g':89, 'b':28, 'id':'730', 'name':false},
		'a8a36f': {'r':168, 'g':163, 'b':111, 'id':'3013', 'name':false},
		'897e47': {'r':137, 'g':126, 'b':71, 'id':'3012', 'name':false},
		'645e32': {'r':100, 'g':94, 'b':50, 'id':'3011', 'name':false},
		'a79b6c': {'r':167, 'g':155, 'b':108, 'id':'372', 'name':false},
		'96844f': {'r':150, 'g':132, 'b':79, 'id':'371', 'name':false},
		'98864f': {'r':152, 'g':134, 'b':79, 'id':'370', 'name':false},
		'edce5d': {'r':237, 'g':206, 'b':93, 'id':'*17', 'name':false},
		'deb83a': {'r':222, 'g':184, 'b':58, 'id':'*18', 'name':false},
		'c6a655': {'r':198, 'g':166, 'b':85, 'id':'834', 'name':false},
		'b39341': {'r':179, 'g':147, 'b':65, 'id':'833', 'name':false},
		'9f7c2a': {'r':159, 'g':124, 'b':42, 'id':'832', 'name':false},
		'846a26': {'r':132, 'g':106, 'b':38, 'id':'831', 'name':false},
		'6f5624': {'r':111, 'g':86, 'b':36, 'id':'830', 'name':false},
		'6a4c20': {'r':106, 'g':76, 'b':32, 'id':'829', 'name':false},
		'f1ecc8': {'r':241, 'g':236, 'b':200, 'id':'746', 'name':false},
		'e9d398': {'r':233, 'g':211, 'b':152, 'id':'677', 'name':false},
		'bf9b68': {'r':191, 'g':155, 'b':104, 'id':'422', 'name':false},
		'a6804b': {'r':166, 'g':128, 'b':75, 'id':'3828', 'name':false},
		'8b6232': {'r':139, 'g':98, 'b':50, 'id':'420', 'name':false},
		'704f26': {'r':112, 'g':79, 'b':38, 'id':'869', 'name':false},
		'cbbea1': {'r':203, 'g':190, 'b':161, 'id':'613', 'name':false},
		'9c885e': {'r':156, 'g':136, 'b':94, 'id':'612', 'name':false},
		'776445': {'r':119, 'g':100, 'b':69, 'id':'611', 'name':false},
		'6d5a37': {'r':109, 'g':90, 'b':55, 'id':'610', 'name':false},
		'ddcf9a': {'r':221, 'g':207, 'b':154, 'id':'3047', 'name':false},
		'c3a96c': {'r':195, 'g':169, 'b':108, 'id':'3046', 'name':false},
		'a68352': {'r':166, 'g':131, 'b':82, 'id':'3045', 'name':false},
		'916b3d': {'r':145, 'g':107, 'b':61, 'id':'167', 'name':false},
		'dfb36b': {'r':223, 'g':179, 'b':107, 'id':'676', 'name':false},
		'c08e46': {'r':192, 'g':142, 'b':70, 'id':'729', 'name':false},
		'a57834': {'r':165, 'g':120, 'b':52, 'id':'680', 'name':false},
		'9c6d2a': {'r':156, 'g':109, 'b':42, 'id':'3829', 'name':false},
		'efc765': {'r':239, 'g':199, 'b':101, 'id':'3822', 'name':false},
		'e0af44': {'r':224, 'g':175, 'b':68, 'id':'3821', 'name':false},
		'd69f2c': {'r':214, 'g':159, 'b':44, 'id':'3820', 'name':false},
		'c68b1c': {'r':198, 'g':139, 'b':28, 'id':'3852', 'name':false},
		'e6aa33': {'r':230, 'g':170, 'b':51, 'id':'728', 'name':false},
		'ca882a': {'r':202, 'g':136, 'b':42, 'id':'783', 'name':false},
		'a0671a': {'r':160, 'g':103, 'b':26, 'id':'782', 'name':false},
		'8f541d': {'r':143, 'g':84, 'b':29, 'id':'780', 'name':false},
		'feefbb': {'r':254, 'g':239, 'b':187, 'id':'3823', 'name':false},
		'fdcb7f': {'r':253, 'g':203, 'b':127, 'id':'3855', 'name':false},
		'ffc270': {'r':255, 'g':194, 'b':112, 'id':'*19', 'name':false},
		'e99b51': {'r':233, 'g':155, 'b':81, 'id':'3854', 'name':false},
		'cc702b': {'r':204, 'g':112, 'b':43, 'id':'3853', 'name':false},
		'dfa263': {'r':223, 'g':162, 'b':99, 'id':'3827', 'name':false},
		'd7914c': {'r':215, 'g':145, 'b':76, 'id':'977', 'name':false},
		'ba7029': {'r':186, 'g':112, 'b':41, 'id':'976', 'name':false},
		'9c5824': {'r':156, 'g':88, 'b':36, 'id':'3826', 'name':false},
		'79411e': {'r':121, 'g':65, 'b':30, 'id':'975', 'name':false},
		'fcf17c': {'r':252, 'g':241, 'b':124, 'id':'445', 'name':false},
		'ffde05': {'r':255, 'g':222, 'b':5, 'id':'307', 'name':false},
		'fbce00': {'r':251, 'g':206, 'b':0, 'id':'973', 'name':false},
		'ffcb00': {'r':255, 'g':203, 'b':0, 'id':'444', 'name':false},
		'fced9b': {'r':252, 'g':237, 'b':155, 'id':'3078', 'name':false},
		'fde174': {'r':253, 'g':225, 'b':116, 'id':'727', 'name':false},
		'fccd43': {'r':252, 'g':205, 'b':67, 'id':'726', 'name':false},
		'f4b73d': {'r':244, 'g':183, 'b':61, 'id':'725', 'name':false},
		'fba700': {'r':251, 'g':167, 'b':0, 'id':'972', 'name':false},
		'ffe19a': {'r':255, 'g':225, 'b':154, 'id':'745', 'name':false},
		'ffd77a': {'r':255, 'g':215, 'b':122, 'id':'744', 'name':false},
		'ffc245': {'r':255, 'g':194, 'b':69, 'id':'743', 'name':false},
		'f8a322': {'r':248, 'g':163, 'b':34, 'id':'742', 'name':false},
		'f98a0a': {'r':249, 'g':138, 'b':10, 'id':'741', 'name':false},
		'f77000': {'r':247, 'g':112, 'b':0, 'id':'740', 'name':false},
		'fd741e': {'r':253, 'g':116, 'b':30, 'id':'970', 'name':false},
		'ec5415': {'r':236, 'g':84, 'b':21, 'id':'947', 'name':false},
		'db5020': {'r':219, 'g':80, 'b':32, 'id':'946', 'name':false},
		'ba401f': {'r':186, 'g':64, 'b':31, 'id':'900', 'name':false},
		'ffc7b1': {'r':255, 'g':199, 'b':177, 'id':'967', 'name':false},
		'fbaa92': {'r':251, 'g':170, 'b':146, 'id':'3824', 'name':false},
		'f79174': {'r':247, 'g':145, 'b':116, 'id':'3341', 'name':false},
		'ef714a': {'r':239, 'g':113, 'b':74, 'id':'3340', 'name':false},
		'ed4e1e': {'r':237, 'g':78, 'b':30, 'id':'608', 'name':false},
		'd12c17': {'r':209, 'g':44, 'b':23, 'id':'606', 'name':false},
		'edceae': {'r':237, 'g':206, 'b':174, 'id':'951', 'name':false},
		'e9b382': {'r':233, 'g':179, 'b':130, 'id':'3856', 'name':false},
		'f09056': {'r':240, 'g':144, 'b':86, 'id':'722', 'name':false},
		'de6628': {'r':222, 'g':102, 'b':40, 'id':'721', 'name':false},
		'c24e13': {'r':194, 'g':78, 'b':19, 'id':'720', 'name':false},
		'f6a46f': {'r':246, 'g':164, 'b':111, 'id':'3825', 'name':false},
		'c86f3d': {'r':200, 'g':111, 'b':61, 'id':'922', 'name':false},
		'b2572b': {'r':178, 'g':87, 'b':43, 'id':'921', 'name':false},
		'954123': {'r':149, 'g':65, 'b':35, 'id':'920', 'name':false},
		'88331a': {'r':136, 'g':51, 'b':26, 'id':'919', 'name':false},
		'7a3321': {'r':122, 'g':51, 'b':33, 'id':'918', 'name':false},
		'f9e3c9': {'r':249, 'g':227, 'b':201, 'id':'3770', 'name':false},
		'e4c0a0': {'r':228, 'g':192, 'b':160, 'id':'945', 'name':false},
		'd88e5d': {'r':216, 'g':142, 'b':93, 'id':'402', 'name':false},
		'b46936': {'r':180, 'g':105, 'b':54, 'id':'3776', 'name':false},
		'965226': {'r':150, 'g':82, 'b':38, 'id':'301', 'name':false},
		'793814': {'r':121, 'g':56, 'b':20, 'id':'400', 'name':false},
		'5d2f18': {'r':93, 'g':47, 'b':24, 'id':'300', 'name':false},
		'ebc8c2': {'r':235, 'g':200, 'b':194, 'id':'225', 'name':false},
		'd1a29b': {'r':209, 'g':162, 'b':155, 'id':'224', 'name':false},
		'c48f8c': {'r':196, 'g':143, 'b':140, 'id':'152', 'name':false},
		'a6666a': {'r':166, 'g':102, 'b':106, 'id':'223', 'name':false},
		'955255': {'r':149, 'g':82, 'b':85, 'id':'3722', 'name':false},
		'833d3e': {'r':131, 'g':61, 'b':62, 'id':'3721', 'name':false},
		'6d2b2a': {'r':109, 'g':43, 'b':42, 'id':'221', 'name':false},
		'eed2bc': {'r':238, 'g':210, 'b':188, 'id':'948', 'name':false},
		'e4b196': {'r':228, 'g':177, 'b':150, 'id':'754', 'name':false},
		'd69e7e': {'r':214, 'g':158, 'b':126, 'id':'3771', 'name':false},
		'd39b82': {'r':211, 'g':155, 'b':130, 'id':'758', 'name':false},
		'b97561': {'r':185, 'g':117, 'b':97, 'id':'3778', 'name':false},
		'a45f4c': {'r':164, 'g':95, 'b':76, 'id':'356', 'name':false},
		'994b3d': {'r':153, 'g':75, 'b':61, 'id':'3830', 'name':false},
		'7d3026': {'r':125, 'g':48, 'b':38, 'id':'355', 'name':false},
		'762721': {'r':118, 'g':39, 'b':33, 'id':'3777', 'name':false},
		'dead9a': {'r':222, 'g':173, 'b':154, 'id':'3779', 'name':false},
		'aa7766': {'r':170, 'g':119, 'b':102, 'id':'3859', 'name':false},
		'73403a': {'r':115, 'g':64, 'b':58, 'id':'3858', 'name':false},
		'562b23': {'r':86, 'g':43, 'b':35, 'id':'3857', 'name':false},
		'ffbfa8': {'r':255, 'g':191, 'b':168, 'id':'*20', 'name':false},
		'bb6557': {'r':187, 'g':101, 'b':87, 'id':'*21', 'name':false},
		'9b3c34': {'r':155, 'g':60, 'b':52, 'id':'*22', 'name':false},
		'e6c7b1': {'r':230, 'g':199, 'b':177, 'id':'3774', 'name':false},
		'dcbaa0': {'r':220, 'g':186, 'b':160, 'id':'950', 'name':false},
		'b38065': {'r':179, 'g':128, 'b':101, 'id':'3064', 'name':false},
		'af806d': {'r':175, 'g':128, 'b':109, 'id':'407', 'name':false},
		'946452': {'r':148, 'g':100, 'b':82, 'id':'3772', 'name':false},
		'754838': {'r':117, 'g':72, 'b':56, 'id':'632', 'name':false},
		'c4b9b0': {'r':196, 'g':185, 'b':176, 'id':'453', 'name':false},
		'a79694': {'r':167, 'g':150, 'b':148, 'id':'452', 'name':false},
		'857470': {'r':133, 'g':116, 'b':112, 'id':'451', 'name':false},
		'967d78': {'r':150, 'g':125, 'b':120, 'id':'3861', 'name':false},
		'6d534e': {'r':109, 'g':83, 'b':78, 'id':'3860', 'name':false},
		'5c463f': {'r':92, 'g':70, 'b':63, 'id':'779', 'name':false},
		'504242': {'r':80, 'g':66, 'b':66, 'id':'3909', 'name':false},
		'ede2ca': {'r':237, 'g':226, 'b':202, 'id':'712', 'name':false},
		'e3cda6': {'r':227, 'g':205, 'b':166, 'id':'739', 'name':false},
		'd2b184': {'r':210, 'g':177, 'b':132, 'id':'738', 'name':false},
		'cca16d': {'r':204, 'g':161, 'b':109, 'id':'437', 'name':false},
		'af7e49': {'r':175, 'g':126, 'b':73, 'id':'436', 'name':false},
		'9d6a35': {'r':157, 'g':106, 'b':53, 'id':'435', 'name':false},
		'885325': {'r':136, 'g':83, 'b':37, 'id':'434', 'name':false},
		'673f20': {'r':103, 'g':63, 'b':32, 'id':'433', 'name':false},
		'5a3a22': {'r':90, 'g':58, 'b':34, 'id':'801', 'name':false},
		'4c321d': {'r':76, 'g':50, 'b':29, 'id':'898', 'name':false},
		'422c20': {'r':66, 'g':44, 'b':32, 'id':'938', 'name':false},
		'27221b': {'r':39, 'g':34, 'b':27, 'id':'3371', 'name':false},
		'dac6b3': {'r':218, 'g':198, 'b':179, 'id':'543', 'name':false},
		'b99c83': {'r':185, 'g':156, 'b':131, 'id':'3864', 'name':false},
		'947459': {'r':148, 'g':116, 'b':89, 'id':'3863', 'name':false},
		'7e5d42': {'r':126, 'g':93, 'b':66, 'id':'3862', 'name':false},
		'443526': {'r':68, 'g':53, 'b':38, 'id':'3031', 'name':false},
		'fafdf1': {'r':250, 'g':253, 'b':241, 'id':'3865', 'name':false},
		'ebe0c6': {'r':235, 'g':224, 'b':198, 'id':'Ecru', 'name':false},
		'd6cfb3': {'r':214, 'g':207, 'b':179, 'id':'822', 'name':false},
		'bdb79f': {'r':189, 'g':183, 'b':159, 'id':'644', 'name':false},
		'90856b': {'r':144, 'g':133, 'b':107, 'id':'642', 'name':false},
		'7b7156': {'r':123, 'g':113, 'b':86, 'id':'640', 'name':false},
		'585545': {'r':88, 'g':85, 'b':69, 'id':'3787', 'name':false},
		'413b2d': {'r':65, 'g':59, 'b':45, 'id':'3021', 'name':false},
		'45433d': {'r':69, 'g':67, 'b':61, 'id':'844', 'name':false},
		'd3c4af': {'r':211, 'g':196, 'b':175, 'id':'3033', 'name':false},
		'b19e83': {'r':177, 'g':158, 'b':131, 'id':'3782', 'name':false},
		'958567': {'r':149, 'g':133, 'b':103, 'id':'3032', 'name':false},
		'7d6a53': {'r':125, 'g':106, 'b':83, 'id':'3790', 'name':false},
		'55442f': {'r':85, 'g':68, 'b':47, 'id':'3781', 'name':false},
		'c9bcb1': {'r':201, 'g':188, 'b':177, 'id':'*05', 'name':false},
		'baada1': {'r':186, 'g':173, 'b':161, 'id':'*06', 'name':false},
		'928475': {'r':146, 'g':132, 'b':117, 'id':'*07', 'name':false},
		'665749': {'r':102, 'g':87, 'b':73, 'id':'*08', 'name':false},
		'e3dbcc': {'r':227, 'g':219, 'b':204, 'id':'3866', 'name':false},
		'c5ac96': {'r':197, 'g':172, 'b':150, 'id':'842', 'name':false},
		'a08671': {'r':160, 'g':134, 'b':113, 'id':'841', 'name':false},
		'866a54': {'r':134, 'g':106, 'b':84, 'id':'840', 'name':false},
		'584634': {'r':88, 'g':70, 'b':52, 'id':'839', 'name':false},
		'433327': {'r':67, 'g':51, 'b':39, 'id':'838', 'name':false},
		'ccd2c3': {'r':204, 'g':210, 'b':195, 'id':'3072', 'name':false},
		'979a87': {'r':151, 'g':154, 'b':135, 'id':'647', 'name':false},
		'9f9c85': {'r':159, 'g':156, 'b':133, 'id':'3023', 'name':false},
		'84866e': {'r':132, 'g':134, 'b':110, 'id':'3022', 'name':false},
		'c3c4b6': {'r':195, 'g':196, 'b':182, 'id':'3024', 'name':false},
		'adab9d': {'r':173, 'g':171, 'b':157, 'id':'648', 'name':false},
		'7c7969': {'r':124, 'g':121, 'b':105, 'id':'646', 'name':false},
		'626156': {'r':98, 'g':97, 'b':86, 'id':'645', 'name':false},
		'dce6ff': {'r':220, 'g':230, 'b':255, 'id':'B5200', 'name':false},
		'faffff': {'r':250, 'g':255, 'b':255, 'id':'Blanc', 'name':false},
		'd9dedc': {'r':217, 'g':222, 'b':220, 'id':'762', 'name':false},
		'acb3b9': {'r':172, 'g':179, 'b':185, 'id':'415', 'name':false},
		'8a959f': {'r':138, 'g':149, 'b':159, 'id':'318', 'name':false},
		'717881': {'r':113, 'g':120, 'b':129, 'id':'414', 'name':false},
		'cdd0ce': {'r':205, 'g':208, 'b':206, 'id':'*01', 'name':false},
		'b7babc': {'r':183, 'g':186, 'b':188, 'id':'*02', 'name':false},
		'999ca2': {'r':153, 'g':156, 'b':162, 'id':'*03', 'name':false},
		'7b7d80': {'r':123, 'g':125, 'b':128, 'id':'*04', 'name':false},
		'545654': {'r':84, 'g':86, 'b':84, 'id':'535', 'name':false},
		'b1bdc0': {'r':177, 'g':189, 'b':192, 'id':'168', 'name':false},
		'7c8888': {'r':124, 'g':136, 'b':136, 'id':'169', 'name':false},
		'55616a': {'r':85, 'g':97, 'b':106, 'id':'317', 'name':false},
		'444f51': {'r':68, 'g':79, 'b':81, 'id':'413', 'name':false},
		'383f3e': {'r':56, 'g':63, 'b':62, 'id':'3799', 'name':false},
		'161b1a': {'r':22, 'g':27, 'b':26, 'id':'310', 'name':false},
		'c6c5c4': {'r':198, 'g':197, 'b':196, 'id':'1', 'name':false},
		'b3b1b4': {'r':179, 'g':177, 'b':180, 'id':'2', 'name':false},
		'98969d': {'r':152, 'g':150, 'b':157, 'id':'3', 'name':false},
		'7d7b7f': {'r':125, 'g':123, 'b':127, 'id':'4', 'name':false},
		'c4b3aa': {'r':196, 'g':179, 'b':170, 'id':'5', 'name':false},
		'b6a59c': {'r':182, 'g':165, 'b':156, 'id':'6', 'name':false},
		'938175': {'r':147, 'g':129, 'b':117, 'id':'7', 'name':false},
		'6c584e': {'r':108, 'g':88, 'b':78, 'id':'8', 'name':false},
		'584647': {'r':88, 'g':70, 'b':71, 'id':'9', 'name':false},
		'e3d8b0': {'r':227, 'g':216, 'b':176, 'id':'10', 'name':false},
		'e1ce6d': {'r':225, 'g':206, 'b':109, 'id':'11', 'name':false},
		'd4c552': {'r':212, 'g':197, 'b':82, 'id':'12', 'name':false},
		'a8cf9c': {'r':168, 'g':207, 'b':156, 'id':'13', 'name':false},
		'd2dc97': {'r':210, 'g':220, 'b':151, 'id':'14', 'name':false},
		'cbcb80': {'r':203, 'g':203, 'b':128, 'id':'15', 'name':false},
		'bcc259': {'r':188, 'g':194, 'b':89, 'id':'16', 'name':false},
		'e7c25d': {'r':231, 'g':194, 'b':93, 'id':'17', 'name':false},
		'daaf3e': {'r':218, 'g':175, 'b':62, 'id':'18', 'name':false},
		'ffb972': {'r':255, 'g':185, 'b':114, 'id':'19', 'name':false},
		'fcb5a2': {'r':252, 'g':181, 'b':162, 'id':'20', 'name':false},
		'bc645b': {'r':188, 'g':100, 'b':91, 'id':'21', 'name':false},
		'a03e3d': {'r':160, 'g':62, 'b':61, 'id':'22', 'name':false},
		'ecd5d9': {'r':236, 'g':213, 'b':217, 'id':'23', 'name':false},
		'e0d0dc': {'r':224, 'g':208, 'b':220, 'id':'24', 'name':false},
		'd1c8d8': {'r':209, 'g':200, 'b':216, 'id':'25', 'name':false},
		'b9b8d2': {'r':185, 'g':184, 'b':210, 'id':'26', 'name':false},
		'cfcbd1': {'r':207, 'g':203, 'b':209, 'id':'27', 'name':false},
		'767689': {'r':118, 'g':118, 'b':137, 'id':'28', 'name':false},
		'4d445a': {'r':77, 'g':68, 'b':90, 'id':'29', 'name':false},
		'7d81a4': {'r':125, 'g':129, 'b':164, 'id':'30', 'name':false},
		'5c6387': {'r':92, 'g':99, 'b':135, 'id':'31', 'name':false},
		'51577c': {'r':81, 'g':87, 'b':124, 'id':'32', 'name':false},
		'885685': {'r':136, 'g':86, 'b':133, 'id':'33', 'name':false},
		'7c356b': {'r':124, 'g':53, 'b':107, 'id':'34', 'name':false},
		'642451': {'r':100, 'g':36, 'b':81, 'id':'35', 'name':false}
	}
}