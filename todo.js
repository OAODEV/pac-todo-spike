$(document).ready(function () {
    var app = {};

    app.runApp = function () {
        var self = this.runApp;

        var root = $(document.createElement('div'));

        /* abstraction */
        self.model = {
            "title": "PAC Todo",
            "list": app.newList([app.newItem('finish spike')]),
        }

        /* presentation */
        self.view = function() {
            root.html("<h1>" + self.model.title + "</h1>");
            root.append(self.model.list.root);
        }

        /* control */
        self.setTitle = function(newTitle) {
            self.model.title = newTitle;
            self.view();
        }

        /* initialization */
        self.root = root;
        self.view();
        return self;
    };

    app.newList = function (lst) {
        var self = this.newList;
        var root = $(document.createElement('ul'));

        /* abstraction */
        self.model = lst;

        /* presentation */
        self.view = function () {
            self.model.forEach(function (item) {
                var li = document.createElement('li');
                $(li).append(item.root);
                $(root).append(li);
            });
        }

        self.append = function (item) {
            self.model.append(item);
            self.view();
        }

        self.pop = function () {
            self.model.pop();
            self.view();
        }

        self.root = root;
        self.view();
        return self;
    }

    app.newItem = function (text) {
        var self = this.newItem;
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

        /* control */
        self.toggleDone = function () {
            if (!self.model.done) {
                self.model.done = true;
            } else {
                self.model.done = false;
            }
            self.view();
        }

        /* initalization */
        self.root = root;
        self.view();
        return self;
    };


    $('body').append(app.runApp().root);
});

