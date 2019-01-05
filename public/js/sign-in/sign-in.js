var loginReq = function(email, password) {
	let data = { 
		email: email,
		password: password
	};
	let config = {
        onUploadProgress: function(progressEvent) {
        	document.getElementById('load-spinner').classList.remove('d-none');
        },
    };
    axios.post('/func/sign-in', data, config)
    	.then(function(res){
        	document.getElementById('load-spinner').classList.add('d-none');
    		if ( res.data === false ) {
		  		document.getElementById('result').innerHTML = '\
			  		<div class="alert alert-warning alert-dismissible fade show" role="alert">\
					  	<strong class="text-danger">Opps!</strong> Password or username is incorrect.\
					  	<button type="button" class="close" data-dismiss="alert" aria-label="Close">\
					    	<span aria-hidden="true">&times;</span>\
					  	</button>\
					</div>';
				return 0;
		  	} else if (res.data === 0) {
		  		return 0;
		  	}
		  	 else {
		  		// document.cookie = "id=" + this.response + ";path=/";
		  		window.location = '/';
		  		return 0;
		  	}
	    }).catch(function(err){
	    	console.log(err);
	    })
}

document.getElementById('login').addEventListener('click', function(){
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	loginReq(email, password);
})