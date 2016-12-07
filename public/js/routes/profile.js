/**
 *  @file Provides behaviour for the profile page. Added to
 *  routing by {@link js/router.js}.
 */

/**
 *  Provides behaviour for the profile page. Added to
 *  routing by {@link js/router.js}.
 */
function ProfilePage() {

  /** Profile data object */
  function ProfileData(name, pictureURL, subject, college, year, numQuestionsAnswered) {
    this.name = name;
    this.pictureURL = pictureURL;
    this.subject = subject;
    this.college = college;
    this.year = year;
    this.numQuestionsAnswered = numQuestionsAnswered;

    /** Get HTML via {@link fetchListEle}. This function populates the HTML with the
     * data inside this object. */
    this.populateHTML = function(profileEle) {
      profileEle.querySelector("#profile_name").innerHTML
        = this.name;
      profileEle.querySelector("#profile_subject").innerHTML 
        = this.subject;
      profileEle.querySelector("#profile_college_and_year").innerHTML 
        = this.college + "</br>" + this.year;
      profileEle.querySelector("#profile_num_questions_answered").innerHTML 
        = this.numQuestionsAnswered + " Questions answered";
      profileEle.querySelector("#profile_picture")
        .setAttribute("src", this.pictureURL);
    }
  }

  /** Generates a test profile, and returns it. */
  function genTestProfile() {
    return new ProfileData("Rhys Birkinshaw", 
        "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg", 
        "Computer Science",
        "St Josephine Butler",
        "First Year",
        24);
  }

  /** Called on page load by Satnav. */
  this.route = function(params) {
    // Fetch profile HTML skeleton
    var profilePageReq = ajax("GET", "/profile.html")
      .then(function(response) {
        // Parse into DOM element
        var temp = document.createElement("div");
        temp.innerHTML = response;
        return temp.firstChild;
      });

    var profileDataReq = genTestProfile();

    Promise.all([profilePageReq, profileDataReq])
      .then(function(results) {
        var profilePageEle = results[0];
        var profileData = results[1];
        // Insert profile data into page ele
        profileData.populateHTML(profilePageEle);
        // Insert profile page into document
        var contentEle = document.getElementById('content');
        contentEle.innerHTML = "";
        contentEle.appendChild(profilePageEle);
      })
    .catch(function(err) {
      console.log(err);
    });
  }

  return this;
}

var profilePage = new ProfilePage();



