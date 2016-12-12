(function () {

    angular.module('app')
            .controller('AllActivitiesController', ['dataService', 'notifier', '$state', 'activities', '$log', AllActivitiesController]);

    function AllActivitiesController(dataService, notifier, $state, activities, $log) {

        var vm = this;
        
        vm.allActivities = activities;

        $log.debug($state.current.data);
        $log.debug($state.current.foo);
        
        vm.selectedMonth = 1; // default to January

        vm.search = function () {
//            var classroom_detail_url = '/classrooms/' + vm.selectedClassroom.id + '/detail/' + vm.selectedMonth;
//            $location.path(classroom_detail_url);
            $state.go('classroom_parent.classroom_detail', {id: vm.selectedClassroom.id, month: vm.selectedMonth});
        };

//        dataService.getAllActivities()
//                .then(function (activities) {
//                    vm.allActivities = activities;
//                });

        dataService.getAllClassrooms()
                .then(function (classrooms) {
                    vm.allClassrooms = classrooms;
                    vm.selectedClassroom = classrooms[0];
                })
                .catch(showError);

        function showError(message) {
            notifier.error(message);
        }

    }

}());