$(document).ready(function () {
    app.view($("#root"));
});

var app = (function () {
    var self = this;

    self.model = {
        "message": "this is the app",
        "rootNode": null,
    }

    self.view = function(rootNode) {
        if (rootNode) {
            self.model.rootNode = rootNode;
        }
        self.model.rootNode.html("<h2>" + self.model.message + "</h2>");
    }

    self.setMessage = function(newMessage) {
        self.model.message = newMessage
        self.view()
    }

    return self;
}());
