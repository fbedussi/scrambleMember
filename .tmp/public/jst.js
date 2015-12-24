this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/scramble.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container" ng-controller="ScrambleCtrl as scramble">\n    <div>\n        <h1 align="center">Teams</h1>\n        <br>\n        <div id="todo-form" class="row">\n            <div class="col-sm-8 col-sm-offset-2 text-center">\n                <fieldset>\n                    <div ng-repeat="singleTeam in teams">\n                        <input type="radio" name="team" ng-click="selectTeam(singleTeam)">\n                        <!--<input type="text" class="form-control input-lg text-center" placeholder="Enter new team name" value="{{singleTeam.name}}" ng-model="formDataTeam.name">-->\n                        {{singleTeam.name}}\n                        <button ng-click="removeTeam(singleTeam)">del</button>\n                        \n                    </div>\n                </fieldset>\n                <form>\n                    <input type="text" class="form-control input-lg text-center" placeholder="Enter new team name" ng-model="formDataTeam.name">\n                    <button type="submit" class="btn btn-primary btn-lg" ng-click="addTeam()">Add Team</button>\n                </form>\n            </div>\n        </div>\n    </div>\n    <div>\n        <p>Selected team: {{selectedTeam.name}}</p>\n        <p>Team members:</p>\n        <ul>\n            <li ng-repeat="singleMember in members">\n                {{singleMember.name}}\n            </li>\n        </ul>\n        \n        <form>\n            <input type="text" class="form-control input-lg text-center" placeholder="Enter new team member name" ng-model="formDataMember.name">\n            <button type="submit" class="btn btn-primary btn-lg" ng-click="addMember()">Add Member</button>\n        </form>\n    </div>\n    <!--<div id="todo-list" class="row">\n        <div class="col-sm-4 col-sm-offset-4">\n            <div class="checkbox" ng-repeat="singleTodo in todos">\n                <label>\n                    <input type="checkbox" ng-click="todo.removeTodo(singleTodo)">\n                    {{ singleTodo.value }}\n                </label>\n            </div>\n        </div>\n    </div>-->\n</div>\n';

}
return __p
};

this["JST"]["assets/templates/todo.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container" ng-controller="TodoCtrl as todo">\n    <div class="jumbotron">\n        <h1 align="center">Todo Application</h1>\n        <br>\n        <div id="todo-form" class="row">\n            <div class="col-sm-8 col-sm-offset-2 text-center">\n                <form>\n                    <div class="form-group">\n                        <input type="text" class="form-control input-lg text-center" placeholder="Add Todo!" ng-model="formData.value">\n                        <br>\n                        <button type="submit" class="btn btn-primary btn-lg" ng-click="addTodo()">Add Todo</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n    <div id="todo-list" class="row">\n        <div class="col-sm-4 col-sm-offset-4">\n            <div class="checkbox" ng-repeat="singleTodo in todos">\n                <label>\n                    <input type="checkbox" ng-click="todo.removeTodo(singleTodo)">\n                    {{ singleTodo.value }}\n                </label>\n            </div>\n        </div>\n    </div>\n</div>\n';

}
return __p
};