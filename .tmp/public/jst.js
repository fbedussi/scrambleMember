this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/scramble.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div ng-controller="ScrambleCtrl as scramble">\n    <div>\n        <h1>Team members position scramble</h1>\n        <h2>Teams</h2>\n        <div>\n            <fieldset>\n                <div ng-repeat="singleTeam in teams">\n                    <input type="radio" name="team" ng-click="selectTeam(singleTeam)" ng-checked="singleTeam === selectedTeam">\n                    <span ng-hide="teamEdit" ng-click="teamEdit = true">{{singleTeam.name}}</span>\n                    <form ng-show="teamEdit" ng-submit="teamEdit = false">\n                        <input type="text" ng-model="singleTeam.name">\n                        <button type="submit" ng-click="editTeam(singleTeam)">save</button>\n                    </form>\n                    <button ng-click="removeTeam(singleTeam)">del</button>\n                </div>\n            </fieldset>\n            <form>\n                <input type="text" placeholder="Enter new team name" ng-model="formDataNewTeam.name">\n                <button type="submit" ng-click="addTeam()">Add Team</button>\n            </form>\n        </div>\n    </div>\n    <div ng-show="selectedTeam.name">\n        <h2>Members</h2>\n        <p>Selected team: {{selectedTeam.name}}</p>\n        <p>Team members:</p>\n        <ol>\n            <li ng-repeat="singleMember in members | orderBy:\'pos\'">\n                {{singleMember.name}}\n                <button ng-click="removeMember(singleMember)">del</button>\n            </li>\n        </ol>\n        <button ng-click="scrambleMembers()">Scramble Members</button>\n        <span ng-show="dataSaved" class="ng-hide-animate ng-show-animate">saved</span>\n        <form>\n            <input type="text" placeholder="Enter new team member name" ng-model="formDataMember.name">\n            <button type="submit" ng-click="addMember()">Add Member</button>\n        </form>\n    </div>\n    <!--<div id="todo-list" class="row">\n        <div class="col-sm-4 col-sm-offset-4">\n            <div class="checkbox" ng-repeat="singleTodo in todos">\n                <label>\n                    <input type="checkbox" ng-click="todo.removeTodo(singleTodo)">\n                    {{ singleTodo.value }}\n                </label>\n            </div>\n        </div>\n    </div>-->\n</div>\n';

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