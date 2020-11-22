// Variables added to store reference from the form element with an id of user form and the input element with anid of user name
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

// variables for the right side repo dispolay
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

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
// see code above for the original
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url.  Uodated this to include error handling.
    fetch(apiUrl)
        .then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) { //catched network errors
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
    });
  };  
//getUserRepos(); // can now try to call using getUserRepos("microsoft") or getUserRepos("facebook").
// commented out because now we are using an event listener to look for a click

// ------------------------------- Submit handler from form -------------------------------
// gets information from the click event.  This was the original code:
            // var formSubmitHandler = function(event) {
            //     event.preventDefault(); // prevents default action of browser, we then can specify what to do
            //     console.log(event); //
            // };

var formSubmitHandler = function(event) {
    event.preventDefault(); // prevents default action of browser, we then can specify what to do
    // get value from input element
    var username = nameInputEl.value.trim(); // get the input from the form.  trim() to get rd of any extra spaces at beg or end

    if (username) {         // if there is a username  entered
        getUserRepos(username); // call function with the entered user name
        nameInputEl.value = ""; // then clear the form to get ready for the next request
    } else {
        alert("Please enter a GitHub username");
    }
};

// ------------------------------- Display Repos -------------------------------
// this function qill acccept both array of repo data and the term we searched for as paramenters.
// inputs to this function come from the getUserRepo function

var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm; // this will display the search term on the screen

    console.log(repos);
    console.log(searchTerm);

    // loop over repos
    for (var i = 0; i < repos.length; i++) {

        // -------------------- this block diaplys the repos names
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
    
        // create a container for each repo (originally, this was a div, we changed it to a link to make the pages interact (6.4)
        // create a link for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName); // link to the issues page
    
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
    
        // append to container
        repoEl.appendChild(titleEl);
        // -------------------- end repos names block

        //  -------------- this block pulls the issues for the repo
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // ------------- end status block

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
  };



  userFormEl.addEventListener("submit", formSubmitHandler);