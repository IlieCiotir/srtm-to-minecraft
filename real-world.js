function buildWorld(name) {
    var config = loadConfig();
    generateWorld(config.prefix, config.lines);
}

function generateWorld(prefix, lines) {
    var worldBuilder = new Drone(self);
    for (var line = 0; line < lines; line++) {
        generateLine(readLine(prefix, line), worldBuilder);
        worldBuilder.right();
    }
}

function generateLine(data, worldBuilder) {
    worldBuilder.up().box(blocks.dirt);
    for (var column in data) {
        generateColumn(column, worldBuilder);
        worldBuilder.fwd();
    }
    worldBuilder.back(data.length);
}

function generateColumn(height, worldBuilder) {
    echo("Generating " + height);
    for (var i = 1; i <= height; i += 1) {
        worldBuilder.box(blocks.dirt).up();
    }
    worldBuilder.down(height);
}
function loadConfig() {
    return scload(__dirname + "/output/config.json");
}
function readLine(prefix, line) {
    return scload(__dirname + "/output/" + prefix + "_" + line + ".json", true);
}

exports.buildWorld = buildWorld;