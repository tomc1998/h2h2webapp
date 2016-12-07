// Setup page routing
Router.setupRoutes();

var pageLoaded = 0;
function onPageLoad() {
  pageLoaded = 1;
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

if (window.addEventListener) { // W3C standard 
  window.addEventListener('load', onPageLoad, false); 
} 
else if (window.attachEvent) { // Microsoft
  window.attachEvent('onload', onPageLoad);
}
