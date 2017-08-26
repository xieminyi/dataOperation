

var filter = {

	//!\ METHOD :
	// - return "No payloads" if request is none or empty array
	// - return filtered data with status eql 200
	request: (req, res) => {

		var payload = req.body.payload || '';

		try{
			if(payload == '' || payload.length<1 || payload.constructor.toString().indexOf("Array") <= -1){ 
				// No payload
				res.status(400);
				res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify({
					status : 400,
					message: "No payloads",
				}, null, 3));
				return;
			}

			var rtnData = filterData(payload);
			
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
    		res.send(JSON.stringify({response: rtnData}, null, 3));
    		return;

		} catch (err){
			res.status(400);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				status: 400,
				error: 'Could not decode request: JSON parsing failed'
			}, null, 3));
		}
	},
};


// Private function

//!\ METHOD :
// - param list of objects
// - return required sets (workflow: completed, type: htv)
function filterData(payload){
	var arr = [];
	for(var i=0;i<payload.length;i++){
		if(payload[i].type == "htv" && payload[i].workflow == "completed"){
			arr.push({
				concataddress: concatAddress(payload[i].address),
    			type: payload[i].type,
    			workflow: payload[i].workflow
			});
		}
	}
	return arr;
}

//!\ METHOD :
// - param address object
// - return a concatenation of address
function concatAddress(address){
	var combAddress = '';
    if(address.unitNumber){
    	combAddress = addAddressComponent(combAddress, address.unitNumber);
    }
    if(address.buildingNumber){
    	combAddress = addAddressComponent(combAddress, address.buildingNumber);
    }
    if(address.street){
    	combAddress = addAddressComponent(combAddress, address.street);
    }
    if(address.suburb){
    	combAddress = addAddressComponent(combAddress, address.suburb);
    }
    if(address.state){
    	combAddress = addAddressComponent(combAddress, address.state);
    }
    if(address.postcode){
    	combAddress = addAddressComponent(combAddress, address.postcode);
    }
    return combAddress.trim();
}

//!\ METHOD :
// - param existing address and new component
// - return new address
function addAddressComponent(address, component){
	if(component){
		address = address + ' ' + component + ' ';
	}
	return address;
}

module.exports = filter;


