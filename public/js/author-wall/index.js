var updateAvatarReq = function(fileData) {
	if ( !fileData ) {
		alert('Hack cmm à!');
	} else {
	  	let data = new FormData();
	  	data.append('fileData', fileData);

	  	let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {
            	document.getElementById('spinner-upload').classList.remove('d-none');
            }
	    };

		axios.post('/func/upload-avatar', data, config)
	            .then(function (res) {
	            	document.getElementById('avatar-author').setAttribute('style', 'background-image: url(' + res.data + ')');
            		document.getElementById('spinner-upload').classList.add('d-none');
            		$('#upload-avatar-modal').modal('hide');
	            })
	            .catch(function (err) {
	            	console.log(err);
	            });
		}
}

// Preview file
document.getElementById('upload-avatar').addEventListener('change', function(event) {
	var tmppath = URL.createObjectURL(event.target.files[0]);
	$('#upload-avatar-modal').modal('show');
	document.getElementById('preview-img-upload').setAttribute('src', tmppath);
});

// Save upload
document.getElementById('upload-avatar-btn').addEventListener('click', function(){
	let fileData = document.getElementById('upload-avatar').files[0];
	updateAvatarReq(fileData);
	return 0;
})