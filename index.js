const argv = require("yargs").argv;
const { createFile, getFiles, getFile } = require("./files");
const chalk = require("chalk");


const invokeAction = ({ action, fileName, content }) => {
    switch (action) {
        case "create":
            createFile(fileName, content);
            break;
        case "get":
            getFiles();
            break;
        case "find":
            getFile(fileName);
            break;
        default:
            console.warn(chalk.yellow("Unknown action type"))
    }
}

invokeAction(argv);


