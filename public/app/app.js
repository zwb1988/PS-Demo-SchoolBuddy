(function () {

    var app = angular.module('app', ['ui.router']);
    /*
     app.config(['$logProvider', '$routeProvider', '$locationProvider',
     function ($logProvider, $routeProvider, $locationProvider) {
     
     $logProvider.debugEnabled(true);
     
     //$locationProvider.hashPrefix('');
     
     //            $locationProvider.html5Mode({
     //                enabled: true,
     //                requireBase: true,
     //                rewriteLinks: true
     //            });
     
     $routeProvider
     .when('/', {
     controller: 'HomeController',
     controllerAs: 'home',
     templateUrl: '/app/templates/home.html'
     })
     .when('/schools', {
     controller: 'AllSchoolsController',
     controllerAs: 'schools',
     templateUrl: '/app/templates/allSchools.html'//,
     //caseInsensitiveMatch: true
     })
     .when('/classrooms', {
     controller: 'AllClassroomsController',
     controllerAs: 'classrooms',
     templateUrl: '/app/templates/allClassrooms.html',
     //                        redirectTo: function (params, currPath, currSearch) {
     //                            console.log(params);
     //                            console.log(currPath);
     //                            console.log(currSearch);
     //                            return '/';
     //                        }
     //                        resolve: {
     //                            promise: function () {
     //                                throw 'error transistioning to classrooms';
     //                            }
     //                        }
     })
     .when('/activities', {
     controller: 'AllActivitiesController',
     controllerAs: 'activities',
     templateUrl: '/app/templates/allActivities.html',
     resolve: {
     activities: function (dataService) {
     return dataService.getAllActivities();
     }
     }
     })
     .when('/classrooms/:id', {
     templateUrl: '/app/templates/classroom.html',
     controller: 'ClassroomController',
     controllerAs: 'classroom'
     })
     .when('/classrooms/:id/detail/:month?', {
     templateUrl: '/app/templates/classroomDetail.html',
     controller: 'ClassroomController',
     controllerAs: 'classroom'
     })
     .otherwise('/');
     
     }]);
     */

    app.config(['$logProvider', '$stateProvider', '$urlRouterProvider',
        function ($logProvider, $stateProvider, $urlRouterProvider) {
            $logProvider.debugEnabled(true);
            $urlRouterProvider.otherwise('/');
            $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: '/app/templates/home.html',
                        controller: 'HomeController',
                        controllerAs: 'home'
                    })
                    .state('schools', {
                        url: '/schools',
                        controller: 'AllSchoolsController',
                        controllerAs: 'schools',
                        templateUrl: '/app/templates/allSchools.html'
                    })
                    .state('classrooms', {
                        url: '/classrooms',
                        controller: 'AllClassroomsController',
                        controllerAs: 'classrooms',
                        templateUrl: '/app/templates/allClassrooms.html',
                        onEnter: function ($log) {
                            //$log.debug('Entering the classroom state.');
                        },
                        onExit: function ($log) {
                            //$log.debug('Exiting the classroom state.');
                        }
                    })
                    .state('activities', {
                        url: '/activities',
                        controller: 'AllActivitiesController',
                        controllerAs: 'activities',
                        templateUrl: '/app/templates/allActivities.html',
                        resolve: {
                            activities: function (dataService) {
                                return dataService.getAllActivities();
                            }
                        },
                        data: {
                            name: 'My Activity',
                            desc: 'Fun!'
                        },
                        foo: {
                            myFoo: 'bar'
                        }
                    })
                    .state('classroom_parent', {
                        abstract: true,
                        url: '/classrooms/:id',
                        templateUrl: '/app/templates/classroom_parent.html',
                        controller: 'ClassroomController',
                        controllerAs: 'classroom',
                        params: {
                            classroomMessage: {value: 'Learning is fun!'}
                        },
                        resolve: {
                            classroom: function (dataService, $stateParams) {
                                return dataService.getClassroom($stateParams.id);
                            }
                        }
                    })
                    .state('classroom_parent.classroom_summary', {
                        url: '/summary',
                        views: {
                            'classInfo': {
                                templateUrl: '/app/templates/classroom.html',
                                controller: 'ClassroomSummaryController',
                                controllerAs: 'classroomSummary'
                            },
                            'classMessage': {
                                templateUrl: '/app/templates/classroom_message.html',
                                controller: 'ClassroomMessageController',
                                controllerAs: 'classroomMessage'
                            }
                        }
                    })
                    .state('classroom_parent.classroom_detail', {
                        url: '/detail/{month}',
                        views: {
                            'classInfo': {
                                templateUrl: '/app/templates/classroomDetail.html'
                            }
                        }

                    });
        }]);
    app.run(['$rootScope', '$log', function ($rootScope, $log) {
            /*
             $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
             //                $log.debug('successfully changed routes');
             //
             //                $log.debug(event);
             //                $log.debug(current);
             //                $log.debug(previous);
             });
             
             $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
             $log.debug('error changed routes');
             
             $log.debug(event);
             $log.debug(current);
             $log.debug(previous);
             $log.debug(rejection);
             });*/

//            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
//                $log.debug('successfully changed states');
//
//                $log.debug(event);
//                $log.debug(toState);
//                $log.debug(toParams);
//                $log.debug(fromState);
//                $log.debug(fromParams);
//            });

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                $log.error('An error occurred while changing states :' + error);
            });
            $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                $log.error('The requested state was not found: ', unfoundState);
            });
        }]);
}());