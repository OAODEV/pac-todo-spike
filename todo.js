$(document).ready(function () {
    var app = {};

    app.runApp = function () {
        var self = {};
        var root = $(document.createElement('div'));
        var todoOne = app.newItem('todoOne');
        var todoTwo = app.newItem('todoTwo');
        var todoForm = app.newItem('type your todo here');
        var todoList = app.newList([todoForm]);
        var doneFilter = function (todoItem) { return todoItem.model.done };
        var todoFilter = function (todoItem) { return !todoItem.model.done };

        todoForm.form();
        todoOne.model.done = true;
        todoOne.view();

        /* abstraction */
        self.model = {
            "title": "PAC Todo",
            "list": app.newList([todoOne, todoTwo, todoForm]),
            "filter": {
                "#done": doneFilter,
                "#todo": todoFilter,
            }
        }

        /* presentation */
        self.view = function() {
            var fragment = window.location.hash
            root.html("<h1>" + self.model.title + "</h1>");
            if (self.model.filter[fragment]) {
                self.model.list.filter = self.model.filter[fragment];
            }
            root.append(self.model.list.root);
            self.model.list.view();
        }

        /* control */
        self.setTitle = function(newTitle) {
            self.model.title = newTitle;
            self.view();
        }

        self.appendTodoForm = function () {
            var todoForm = app.newItem('new todo');
            todoForm.form();
            todoForm.postBecomeHook = self.appendTodoForm;
            self.model.list.push(todoForm);
        }

        /* initialization */
        todoForm.postBecomeHook = self.appendTodoForm;
        self.root = root;
        self.view();
        return self;
    };

    app.newList = function (lst) {
        var self = {};
        var root = $(document.createElement('ul'));

        /* abstraction */
        self.model = lst;
        self.filter = function (x) { return true; };

        /* presentation */
        self.view = function () {
            self.model.forEach(function (item) {
                var li
                if (self.filter(item)) {
                    li = document.createElement('li');
                    $(li).append(item.root);
                    $(root).append(li);
                }
                $('li').filter(function () {
                    return $.trim(this.innerHTML) === "";
                }).remove();
            });
        }

        self.push = function (item) {
            self.model.push(item);
            self.view();
        }

        self.pop = function () {
            self.model.pop();
            self.view();
        }

        self.root = root;
        return self;
    }

    app.newItem = function (text) {
        var self = {};
        var root = $(document.createElement('div'));

        /* abstraction */
        self.model = {
            "text": text,
            "done": false,
        }

        /* presentation */
        self.view = function () {
            root.html(self.model.text);
            root.removeClass();
            if (!self.model.done) {
                root.addClass('todo');
            } else {
                root.addClass('done');
            }
            root.off().on('click', self.toggleDone);
        };

        self.form = function () {
            root.removeClass();
            root.html("<form>new: <input type='text' value='" + self.model.text + "' name='new-todo'></form><i class='fa fa-check'></i>");
            root.off().on('click', '.fa-check', self.becomeTodo);
        }

        /* control */
        self.toggleDone = function () {
            if (!self.model.done) {
                self.model.done = true;
            } else {
                self.model.done = false;
            }
            self.view();
        }

        self.postBecomeHook = function () {
            console.log("default post become hook")
        };

        self.becomeTodo = function (e) {
            /* update the model based on form input then view the new item */
            e.preventDefault();
            self.model.text = $('input[name=new-todo]').val();
            self.model.done = false;
            self.view();
            self.postBecomeHook();
        }

        /* initalization */
        self.root = root;
        self.view();
        return self;
    };

    $('body').append(app.runApp().root);
});
