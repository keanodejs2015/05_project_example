/**
 * Created by Sandeep on 01/06/14.
 */

 // http://movieapp-sitepointdemos.rhcloud.com/api/movies/:id

angular.module('movieApp.services',[]).factory('Movie',function($resource){
    return $resource('http://localhost:3000/api/movies/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});