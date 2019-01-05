var signReq = function(name, birthDate, email, password) {
	let data = { 
		name : name,
		birthDate: birthDate,
		email: email,
		password: password
	};
  	let config = {
	  	onUploadProgress: function(progressEvent) {
	  		document.getElementById('load-spinner').classList.remove('d-none');
        }
    };
	axios.post('/func/sign-up', data, config).then(function (res) {
			dataRes = res.data;
	  		document.getElementById('load-spinner').classList.add('d-none');
			if ( dataRes === false ) {
				document.getElementById('result').innerHTML = '\
			  		<div class="alert alert-warning alert-dismissible fade show" role="alert">\
					  	<strong>Opps!</strong> The Email Has Been Place.\
					  	<button type="button" class="close" data-dismiss="alert" aria-label="Close">\
					    	<span aria-hidden="true">&times;</span>\
					  	</button>\
					</div>';
				document.getElementById('email').classList.add("is-invalid");
			} else if (dataRes === true) {
				window.location = '/';
			} else {
				document.getElementById('email').classList.remove("is-invalid");
			}
			return 0;
        }).catch(function (err) {
           	console.log(err);
        });
};

document.getElementById('submit').addEventListener('click', function(){
 	let name = document.getElementById('name').value;
 	let birthDate  = document.getElementById('birth-date').value;
 	let email = document.getElementById('email').value;
 	let password = document.getElementById('password').value;
	signReq(name, birthDate, email, password); 
})