/**
 * Created by liekkas.zeng on 2015/1/7.
 */
angular.module('ng-echarts', []).directive('echarts', ['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attrs, ctrl) {

            function setOption(instance, option) {
                if (option) {
                    instance.clear();
                    instance.setOption(option);
                    instance.resize();
                }
            }

            function bindEvents(instance, events) {

                if (!angular.isArray(events)) {
                    events = [events];
                }
                angular.forEach(events, function (event) {
                    angular.forEach(event, function (handler, eventName) {
                        instance.on(eventName, handler);
                    });
                });

            }


            var chart = echarts.init(element[0]);
            $timeout(function () {
                setOption(chart, scope.option);
                bindEvents(chart, scope.event);
            }, 0);


            scope.$watch("option", function (newValue, oldValue) {
                if (newValue && !angular.equals(newValue, oldValue)) {
                    $timeout(function () {
                        setOption(chart, scope.option);
                    }, 0);
                }
            }, true);

            scope.$on("$destroy", function () {
                chart.clear();
                chart.dispose();
            });

        },
        scope: {
            event: '=ecEvent',
            option: '=ecOption'
        },
        restrict: 'EA'
    }
}]);
