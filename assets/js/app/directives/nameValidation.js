module.exports = function (module) {
  'use strict';
  /**
   * @ndoc directive
   * @name webApp.directive:nameValidation
   * @require 'NgModel'
   * @restrict 'A'
   * @scope
   *
   * @description
   * This check validation for names
   */
  module
    .directive('fullName', function() {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function(scope, element, attrs, controller) {
            controller.$parsers.unshift(function(viewValue) {
              if(viewValue && viewValue.indexOf(' ') !== -1 && viewValue[viewValue.indexOf(' ') + 1]) {
                controller.$setValidity('fullname', true);
                return viewValue;
              } else {
                controller.$setValidity('fullname', false);
                return viewValue;
              }
            });
          }
        };
    });
};
