

var filter = {

	//!\ METHOD :
	// - @return "No payloads" if request is none or empty array
	// - @return filtered data with status eql 200
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
// - @param list of objects
// - @return required sets (drm = true, episodeCount > 0)
function filterData(payload){
	var arr = [];
	for(var i=0;i<payload.length;i++){
		if(payload[i].drm == true && Number(payload[i].episodeCount) > 0){
			arr.push({
				image : payload[i].image.showImage,
    			slug  : payload[i].slug,
    			title : payload[i].title
			});
		}
	}
	return arr;
}

module.exports = filter;


