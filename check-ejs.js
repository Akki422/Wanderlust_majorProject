const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const viewsDir = path.join(__dirname, "views");

function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const file = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            scan(file);
        } else if (entry.isFile() && file.endsWith(".ejs")) {
            try {
                ejs.compile(fs.readFileSync(file, "utf8"), {
                    filename: file
                });
            } catch (err) {
                console.log("\nERROR IN FILE:", file);
                console.log(err.message);
            }
        }
    }
}

scan(viewsDir);
console.log("\nEJS scan completed.");