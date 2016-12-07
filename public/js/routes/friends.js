/**
 *  @file Provides behaviour for the friends page. Added to routing by 
 *  {@link js/router.js}.
 */

/** Class contains functionality for friends list page 
 *  @constructor 
 */
function FriendListPage() {

  /**
   * Friend profile object. Holds friend data, then can populate a friend
   * profile HTML skeleton with the data. 
   */
  var FriendListProfile = function(name, college, subject, year) {
    this.name = name;
    this.college = college;
    this.subject = subject;
    this.year = year;
    // Default picture URL for now.
    this.pictureURL = "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg";

    /** Get HTML via {@link fetchListEle}. This function populates the HTML with the
     * data inside this object. */
    this.populateHTML = function(profileEle) {
      profileEle.querySelector(".friend_name").innerHTML = this.name;
      profileEle.querySelector(".friend_college").innerHTML = this.college;
      profileEle.querySelector(".friend_subject").innerHTML = this.subject;
      profileEle.querySelector(".friend_year").innerHTML = this.year + " year";
      profileEle.querySelector(".friend_picture").setAttribute("src", this.pictureURL);
    }

    return this;
  }

  /** 
   * Generates test FriendListProfile objects. 
   * @return - A promise which is always resolved. Contains a list of
   * FriendListProfiles.
   */
  function genTestFriends() {
    var list = [];
    for(var ii = 0; ii < 10; ++ii) {
      profileData = new FriendListProfile("John" + ii, 
          "Collingwood", 
          "Computer Science", 
          "First");
      list.push(profileData);
    }
    return list;
  }

  /** Called on page load by Satnav. */
  this.route = function(params) {

    // Load friend list HTML skeleton (/friends.html)
    var friendsPageReq = ajax("GET", "/friends.html")
      .then(function(response) {
        // Parse response data into DOM element
        var temp = document.createElement("div");
        temp.innerHTML = response;
        return temp.firstChild;
      });

    // Load friend list item HTML skeleton (/friend_item.html)
    var friendListItemReq = ajax("GET", "/friend_item.html")
      .then(function(response) {
        // Parse response data into DOM element
        var temp = document.createElement("div");
        temp.innerHTML = response;
        return temp.firstChild;
      });

    // Load friend data (just testing for the moment...)
    var friendDataReq = genTestFriends();

    // When all are done...
    Promise.all([ friendsPageReq, friendListItemReq, friendDataReq])
      .then(function(values) {
        var friendsPageEle = values[0]; // friendPage element
        var friendListItemEle = values[1]; // friendListItem element
        var friendData = values[2]; // Friend data

        // Populate all friend data
        listItems = [];
        for (var ii = 0; ii < friendData.length; ++ii) {
          friendData[ii].populateHTML(friendListItemEle);
          listItems.push(friendListItemEle);
          friendListItemEle = friendListItemEle.cloneNode(true);
        }

        // Add friend elements to page skeleton
        var ol = friendsPageEle.querySelector("#friend_list");
        for (var ii = 0; ii < listItems.length; ++ii) {
          ol.appendChild(listItems[ii]);
        }

        // Finally, put this all into the document
        var content = document.getElementById("content");
        content.innerHTML = "";
        content.appendChild(friendsPageEle);
      })
    .catch(function(err) {
      console.log(err);
    });
  }
  return this;
}

var friendListPage = new FriendListPage();



