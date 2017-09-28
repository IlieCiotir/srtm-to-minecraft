function buildWorld(name) {
    var config = loadConfig();
    var worldBuilder = new Drone(self);
    generateWorldRecursive(worldBuilder, config.prefix, config.lines, 0);
}

function generateWorldRecursive(worldBuilder, prefix, lines, current) {
    line(readLine(prefix, current), worldBuilder, function () {
        if (current < lines) {
            worldBuilder.right();
            generateWorldRecursive(worldBuilder, prefix, lines, current + 1);
        }
    });
}

function line(data, worldBuilder, lineDone) {
    var queue = new Queue();
    data.forEach(function (column) {
        queue.add(columnAction(column, worldBuilder));
    });

    queue.doAll(function () {
        worldBuilder.back(data.length);
        lineDone();
    });
}

function columnAction(height, worldBuilder) {
    return function () {
        worldBuilder.fwd();
        for (var i = 1; i <= height; i += 1) {
            worldBuilder.box(blocks.dirt).up();
        }
        worldBuilder.down(height);
    };
}

function loadConfig() {
    return scload(__dirname + "/output/config.json");
}

function readLine(prefix, line) {
    return scload(__dirname + "/output/" + prefix + "_" + line + ".json", true);
}

function Queue() {
    var actions = [];

    this.add = function (action) {
        actions.push(action);
    };

    this.doAll = function (onDone) {
        setInterval(function () {
            if (actions.length == 0) {
                onDone();
            } else {
                actions.pop()();
            }
        }, 100);
    };
}

exports.buildWorld = buildWorld;