/**
 * Created by juaychen on 2017/2/18.
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

            function brushAreas(instance, areas) {
                if (angular.isArray(areas)) {
                    instance.dispatchAction({
                        type: 'brush',
                        areas: areas
                    });
                }
            }

            function initChart(instance) {
                $timeout(function () {
                    setOption(instance, scope.option);
                    bindEvents(instance, scope.event);
                    brushAreas(instance, scope.brushAreas);
                }, 0);
            }


            var chart = echarts.init(element[0]);
            initChart(chart);

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
            event: '=echartsEvent',
            option: '=echartsOption',
            brushAreas: '=echartsBrushAreas'
        },
        restrict: 'EA'
    }
}]);
