// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$stateProvider

	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})
	
	.state('app.home', {
		url: '/home',
		views: {
		  'menuContent': {
			templateUrl: 'templates/home.html',
			controller: 'HomeCtrl'
		  }
		}
	})
	
	.state('app.login', {
		url: '/login',
		views: {
		  'menuContent': {
			templateUrl: 'templates/login.html',
			controller: 'LoginCtrl'
		  }
		}
	})
	
	.state('app.profile', {
		url: '/profile',
		views: {
		  'menuContent': {
			templateUrl: 'templates/profile.html',
			controller: 'ProfileCtrl'
		  }
		}
	})
	
	.state('app.donate', {
		url: '/donate',
		views: {
		  'menuContent': {
			templateUrl: 'templates/donate.html',
			controller: 'DonateCtrl'
		  }
		}
	})
	
	.state('app.findform', {
		url: '/findform',
		views: {
		  'menuContent': {
			templateUrl: 'templates/findform.html',
			controller: 'findFormCtrl'
		  }
		}
	})
	
	.state('app.selecttype', {
		url: '/selecttype',
		views: {
		  'menuContent': {
			templateUrl: 'templates/selecttype.html'
		  }
		}
	})
	
	.state('app.selectpets', {
		url: '/selectpets/:type',
		views: {
		  'menuContent': {
			templateUrl: 'templates/selectpets.html',
			controller: 'selectpetsCtrl'
		  }
		}
	})
	
	.state('app.detail', {
		url: '/detail',
		views: {
		  'menuContent': {
			templateUrl: 'templates/detail.html'
		  }
		}
	})
	
	.state('app.knowledge', {
		url: '/knowledge',
		views: {
		  'menuContent': {
			templateUrl: 'templates/knowledge.html',
			controller: 'knowledgeCtrl'
		  }
		}
	})

	$ionicConfigProvider.backButton.text("");
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');
});