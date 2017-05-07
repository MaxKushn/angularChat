module.exports = function(module) {
	'use strict';
	/**
	 * @ndoc controller
	 * @name webApp.controller:ChatController
	 *
	 * @description
	 * controller for chat page.
	 */
	module
	.controller('ChatController', ChatController)
	.service('MockMessagesService', MockMessagesService);
	 ChatController.$inject = ['$scope', '$interval', 'MockMessagesService', '$timeout', '$localStorage', '$sessionStorage']
   function ChatController($scope, $interval, MockMessagesService, $timeout, $localStorage, $sessionStorage) {
	  /**
 		 * @ngdoc property
 		 * @name vm
 		 *
 		 * @description
 		 * vm is an instance of the current controller.
		 	 */
 		var vm = this;
		vm.messageSound = messageSound;
		vm.options = {playlist: '../../sound/message.mp3'};
		vm.you = {
      userId: '4562KDJYE72930DST283DFY202Dd',
      userName: $localStorage.login,
			avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
    };

    vm.messages = MockMessagesService.getMessages();

    $scope.$on('simple-chat-message-posted', function() {
      console.log('onMessagePosted');
    });

		vm.random = function(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min
		};

		vm.sendMessage = function(message, username) {
	    if(message && message !== '' && username) {
	      vm.messages.push({
       		userName: username,
	        text: message
	      });
			};
			vm.messageSound();
			$timeout(function () {
				var message = angular.copy(vm.randomMessages[vm.random(0, 3)]);
				if(message.id < 5000) {
					message.id = vm.random(5001, 9459);
				} else if (message.id < 10000) {
					message.id = vm.random(0, 4999);
				}
				message.date = new Date;
				vm.messages.push(message);
			}, 1);
  	};

		function messageSound() {
	    var sound = document.createElement("AUDIO");
	    if (sound.canPlayType("audio/mpeg")) {
        sound.setAttribute("src",'./assets/sound/message.mp3');
				sound.play();
	    }
		}

		vm.randomMessages = [{
			  id: 1,
				text: 'How are u ?',
				userName: 'Jean',
				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
			}, {
				id: 2,
				text: 'Sounds good',
				userName: 'Jean',
				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
			}, {
				id: 3,
				text: 'lorem ispum dolum',
				userName: 'Jean',
				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
			}, {
				id: 4,
				text: 'I have a sister, she\'s name Cally',
				userName: 'Jean',
				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
			}]
		};
	}
		function MockMessagesService() {
	    this.getMessages = getMessages;

		  function getMessages() {
		    return [{
					id: 0,
					date: new Date,
		      text: 'Hello.',
		      userName: 'Jean',
		      avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif'
		    }]
			};
	  };
