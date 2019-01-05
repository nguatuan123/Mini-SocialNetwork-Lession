/** Variable
	*- dataUser
 */
let countList = 0;
var renderUsers = function(data) {
	let result = data.map(function(a) {
		countList ++;
		return '<tr><th scope="row">' + countList + '</th><td><div class="avatar-user"><div style="background-image: url('+ a.avatar +')"></div><span>' + a.name + '</span></div></td><td>' + a.birth_date + '</td><td><a href="/' + a.id + '"><button class="btn btn-link">View</button></a></td></tr>'
	});
	return result.join('');
}

var searchReq = function(key) {
  let data = {
    key: key,
    directionNumber: 0
  };
  config = {
    onUploadProgress: function(progressEvent) {
      document.getElementById('load-snipper').classList.remove('d-none');
    }
  }
  axios.post('/func/search', data, config)
    .then(function(res) {
      countList = 0;
      countDirection = 1; // reset direction number
      document.getElementById('pagination-btn').value = countDirection; // reset value direction number button
      
      if ( res.data.surplus <= 0 ) {
        countDirection = 1; // reset direction number
        document.getElementById('pagination-btn').value = countDirection; // reset value direction number button

        document.getElementById('pagination-btn').setAttribute('style', 'display: none');
      } else {
        document.getElementById('pagination-btn').setAttribute('style', 'display: block');
      }

      document.getElementById('load-snipper').classList.add('d-none');
      usersListBase.innerHTML = renderUsers(res.data.data);
      return 0;
    })
    .catch(function(err) {
      console.log(err);
    })
}

var paginationReq = function(key, directionNumber) {
	let data = {
    key: key,
    directionNumber: directionNumber
  };
  config = {
    onUploadProgress: function(progressEvent) {
      document.getElementById('load-snipper').classList.remove('d-none');
    }
  }
  axios.post('/func/pagination', data, config)
    .then(function(res) {
      document.getElementById('load-snipper').classList.add('d-none');
      if ( res.data.surplus <= 0 ) {
        countDirection = 1; // reset direction number
        document.getElementById('pagination-btn').value = countDirection; // reset value direction number button

        document.getElementById('pagination-btn').setAttribute('style', 'display: none');
      } else {
        document.getElementById('pagination-btn').setAttribute('style', 'display: block');
      }
      usersListBase.innerHTML += renderUsers(res.data.data);  
      return 0;
    })
    .catch(function(err) {
      console.log(err);
    })
}

var usersListBase = document.getElementById('users-list'); 
var countDirection = 1; // Inscrease Pagination value
var key = ''; // Save key when search click

usersListBase.innerHTML = renderUsers(dataUsers);

document.getElementById('search-btn').addEventListener('click', function() {
	key = document.getElementById('search-key').value;
  searchReq(key);
})

document.getElementById('pagination-btn').addEventListener('click', function() {
	let directionNumber = document.getElementById('pagination-btn').value;
  paginationReq(key ,directionNumber);

  countDirection++;   // reset direction number
	document.getElementById('pagination-btn').value = countDirection; // reset value of direction number
})
