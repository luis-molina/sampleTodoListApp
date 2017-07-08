sampleTodoApp.controller("TodoController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {
        $scope.oneAtATime = false;
        $scope.groups = [{
                title: "Room1",
                content: "Dynamic Group Body - 1"
            },
            {
                title: "Room2",
                content: "Dynamic Group Body - 2"
            }
        ];

        $scope.items = ['Camera 1', 'Camera 2', 'Camera 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Camera ' + newItemNo);
        };
        //creating reference to a the database in firebase        
        var config = {
            apiKey: "AIzaSyDGqIe1zml0Fk2KVjL2_cr0Dvqac3i3-Lc",
            authDomain: "sampletodolistapp.firebaseapp.com",
            databaseURL: "https://sampletodolistapp.firebaseio.com",
            projectId: "sampletodolistapp",
            storageBucket: "sampletodolistapp.appspot.com",
            messagingSenderId: "499485630635"
        };
        firebase.initializeApp(config);

        //creating reference to the database in firebase
        var database = firebase.database();

        //get all tasks on db
        $scope.todoTasks = $firebaseArray(database.ref().child("tasks"));

        //alert for error
        $scope.alertError = function() {
            alert("Please use task names with at least 5 characters...");
        }

        //add the task to the db
        $scope.addTask = function() {
            if ($scope.taskName && $scope.taskName.length > 4) {
                // CREATE A UNIQUE ID            
                var timestamp = new Date().valueOf();

                $scope.todoTasks.$add({
                    id: "task" + timestamp,
                    name: $scope.taskName,
                    status: 'PENDING'
                });

                $scope.taskName = "";
            } else {
                $scope.alertError();
            }
        }


        // remove task from db
        $scope.deleteTask = function(index, task) {

            // check if it is a valid item
            if (task.id === undefined) return;

            // remove task from database
            $scope.todoTasks.$remove(task);

        };

        // start the progress of the task
        $scope.startTask = function(index, task) {

            // check if it is a valid item
            if (task.id === undefined) return;

            // updating status and save
            task.status = 'STARTED';
            $scope.todoTasks.$save(task);

        };
        // set the task as completed
        $scope.completeTask = function(index, task) {

            // check if it is a valid item
            if (task.id === undefined) return;

            // updating status and save
            task.status = 'COMPLETED';
            $scope.todoTasks.$save(task);

        };
    }
]);