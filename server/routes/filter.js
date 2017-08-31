

var filter = {

	//!\ METHOD :
	// - @return 200 filtered data
	// - @return 400 error log if request is none or empty array
	// - @return 500 error log if internal error
	request: (req, res) => {
		var payload = req.body.payload || '';
		try{
			if(payload == '' || payload.constructor.toString().indexOf("Array") <= -1){ 
				// Log err and time to log file /var/log/myserver.log
				console.log(new Date+': Fail to load payloads since JSON parsing issue');

				res.status(400);
				res.setHeader('Content-Type', 'application/json');
    			res.send(JSON.stringify({
					status : 400,
					error: "Could not decode request: JSON parsing failed",
				}, null, 3));
				return;
			}

			var rtnData = filterData(payload);
			
			res.status(200);
			res.setHeader('Content-Type', 'application/json');
    		res.send(JSON.stringify({response: rtnData}, null, 3));
    		return;
		} catch (err){
			// Log err and time to log file /var/log/myserver.log
			console.log(new Date+': Fail to load payloads since internal error');
			console.log(err);

			res.status(500);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				status: 500,
				error: 'Could not decode request: Internal error'
			}, null, 3));
		}
	},
};

// Private function

//!\ METHOD :
// - @param list of objects
// - @return required sets (drm = true, episodeCount > 0)
function filterData(payloads){
	var arr = [];
	for(var i=0;i<payloads.length;i++){
		if(payloads[i].drm == true && Number(payloads[i].episodeCount) > 0){
			arr.push({
				image : payloads[i].image.showImage,
    			slug  : payloads[i].slug,
    			title : payloads[i].title
			});
		}
	}
	return arr;
}

module.exports = filter;


