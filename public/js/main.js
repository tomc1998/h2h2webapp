window.onload = function() {
  populateFriendList("friend_list");

  // Add listener to sidebar close and open button.
  var sidebarClose = document.getElementById("sidebar_close");
  var sidebarOpen = document.getElementById("sidebar_open");
  sidebarClose.addEventListener("click", function() {
    document.getElementById("sidebar").style.width = "0px";
    sidebarClose.style.display = "none";
  });
  sidebarOpen.addEventListener("click", function() {
    document.getElementById("sidebar").style.width = "300px";
    sidebarClose.style.display = "block";
  });
}

/** Function fetches the HTML for displaying this data in a friend's list */
function fetchListEle() {
  const FRIEND_ITEM_URL = "/friend_item.html";
  var promise = new RSVP.Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          // Convert response to DOM object
          var temp = document.createElement('div');
          temp.innerHTML = this.response;
          resolve(temp.firstChild);
        }
        else {
          reject(this);
        }
      }
    }
    req.open("GET", FRIEND_ITEM_URL, true);
    req.send();
  });
  return promise;
}

function FriendListProfile(name, college, subject, year) {
  this.name = name;
  this.college = college;
  this.subject = subject;
  this.year = year;
  this.pictureURL = "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg";

  /** Get HTML via fetchListEle(). This function populates the HTML with the
   * data inside this object. */
  this.populateHTML = function(profileEle) {
    profileEle.querySelector("#friend_name").innerHTML = this.name;
    profileEle.querySelector("#friend_college").innerHTML = this.college;
    profileEle.querySelector("#friend_subject").innerHTML = this.subject;
    profileEle.querySelector("#friend_year").innerHTML = this.year + " year";
    profileEle.querySelector("#friend_picture").setAttribute("src", this.pictureURL);
  }

  return this;
}

/** Populate the friend list div */
function populateFriendList(listID) {
  // Just try test data for now
  var listDiv = document.getElementById(listID);
  for (var ii = 0; ii < 10; ++ii) {
    profileData = new FriendListProfile("John" + ii, "Collingwood", "Computer Science", "First");
    fetchListEle().then(function(profileEle) {
      profileData.populateHTML(profileEle);
      listDiv.appendChild(profileEle);
    })
    .catch(function(err) {
      console.log(err);
    });
  }
}
