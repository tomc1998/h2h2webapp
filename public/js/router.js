/**
 *  @file Manages routing URLs to different routes (found in routes/
 *  directory).  
 *  Currently uses SatNav library for routing.
 */

var Router = {
  /**
   * The config for satnav.
   */
  satnavConfig: {
    // Don't require HTML5
    html5: false,
    // Always update hash url
    force: true,
    // Time between hashchange polyfills. If on an older browser, and you update
    // the window's hash, it won't implement the hashchange event. Satnav
    // provides a polyfill for this. 
    poll: 100,
    // Default
    matchAll: false,
  },

  /**
   * Setup routing.
   */
  setupRoutes: function() {
    Satnav(Router.satnavConfig)
      .navigate({
        path: "friends",
      directions: friendListPage.route,
      title: "Friends",
      })
    .otherwise('/')
      .go();
  },
};

