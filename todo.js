$(document).ready(function () {
    var app = runApp($("#root"));
});

var runApp = function (rootNode) {
    var self = this;

    self.model = {
        "title": "PAC Todo",
    }

    self.view = function() {
        rootNode.html("<h2>" + self.model.message + "</h2>");
    }

    self.setTitle = function(newTitle) {
        self.model.title = newTitle
        self.view()
    }

    return self;
};

var addItem = function (rootNode, text) {
    var self = this;

    /* abstraction */
    self.model = {
        "text": text,
        "done": false,
    }

    /* presentation */
    self.view = function () {
        rootNode.html(self.model.text);
        if (!done) {
            rootNode.removeClass("done");
            rootNode.addClass("todo");
        } else {
            rootNode.removeClass("todo");
            rootNode.addClass("done");
        }
    };

    /* control */
    self.done = function () {
        self.model.done = true;
        self.view();
    }

    self.todo = function () {
        self.model.done = false;
        self.view();
    }

    return self;
};
