var getUserRepos = function() {
    //console.log("function was called");
    // browser made HTTP request to the octocat repo.  Can see in the network tab of dev tool
    // respose is that the request returns
    fetch("https://api.github.com/users/octocat/repos");
  };
  
  getUserRepos();