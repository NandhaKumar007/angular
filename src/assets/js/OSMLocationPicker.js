var OSMPICKER = (function() {
	var app = {};
	var map;
	app.initmappicker = function(lat, lon) {
		if(map) { map.remove(); }
		
		try { map = new L.Map('locationPicker'); }
		catch(e) { console.log(e); }

		$("#latitude").val(lat);
		$("#longitude").val(lon);

		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osm = new L.TileLayer(osmUrl, { minZoom: 1, maxZoom: 19, attribution: "" });		
		map.setView([lat, lon], 15);
    map.addLayer(osm);
    
    $("#latitude").on('change', function() {
      map.setView([$('#latitude').val(), $('#longitude').val()], 15);
    });
		
		map.on('moveend', function() {
      let locLat = map.getCenter().lat;
      let locLon = map.getCenter().lng;
			$("#latitude").val(locLat);
      $("#longitude").val(locLon);
      findAddress({lat:locLat, lon:locLon}, setAddress);
    });
    
    function setAddress(data) {
			$("#loc_pincode").val(data.pincode);
      $("#loc_address").val(data.address);
		}
    
    function findAddress(coor, callback) {
      var requestUrl = "https://nominatim.openstreetmap.org/reverse?format=json&lat="+coor.lat+"&lon="+coor.lon+"&zoom=18";
      $.ajax({
        url : requestUrl,
        type : "GET",
        dataType : 'json',
        error : function(err) {
          console.log(err);
        },
        success : function(data) {
          console.log(data);
          if(data.address && data.address.postcode) {
            callback({ pincode: data.address.postcode.replace(/[^0-9]*/g, ''), address: data.display_name });
          }
          else {
            console.log(data);
          }
        }
      });
    };

	};
	return app;
})();