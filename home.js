function currentloginid() {
    return fetch('http://localhost/gaq/api/api.php?action=userid', {
       method: 'GET',
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var userid = JSON.parse(data);
        console.log(userid);
        return userid;
    })
}
let a = currentloginid()
console.log(a)