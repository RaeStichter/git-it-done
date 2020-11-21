// this was the original getUser repo when octocar was hard coded.

// var getUserRepos = function() {
//     //console.log("function was called");
//     // browser made HTTP request to the octocat repo.  Can see in the network tab of dev tool
//     // respose is that the request returns
//     //var response = fetch("https://api.github.com/users/octocat/repos");
//     // this returns a promise.  Acts like a more advanced callback function
//     fetch("https://api.github.com/users/octocat/repos").then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//             // this shows a log of the data
        
//         //console.log("inside", response); // this was only item under fetch when the comments were written
//         // fetch request will set aside the fetch request and continue implementing
//         // the code, then come back and run the fetch call back when the response is ready
//         // the url will confirm where the request came from
//         });
//     });

//     console.log("outside"); // this will print prior to the "inside" call
// };

// ------------------------------- Dynamic Call Repo -------------------------------
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };  
getUserRepos(); // can now try to call using getUserRepos("microsoft") or getUserRepos("facebook").