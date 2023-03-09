const fsPromises = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention")



const createFile = (fileName, content) => {
    const data = {
        fileName,
        content,
    }
    const result = dataValidator(data);
    if (result.error) {
        console.log(chalk.red(`Please, specify ${result.error.details[0].context?.key} parametr`))
        return;
    }
    const checkData = checkExtention(fileName)
    if (!checkData.isCorrected) {
        console.log(chalk.red(`Sorry, application doesn't support ${checkData.extention} extention`))
        return;
    }
    fsPromises.writeFile(path.join(__dirname, "./files", fileName), content, "utf-8").then(() => console.log(chalk.green("File created success")))
        .catch(error => console.log(chalk.red(error)))
}
const getFiles = () => {
    fsPromises.readdir(path.join(__dirname, "./files"))
        .then(data => {
            if (!data.length) {
                console.log(chalk.red("There are no files in this directory"))
            }
            data.forEach(file => console.log(chalk.bgGreen(file)))
        })
        .catch(error => console.log(chalk.red(error)))
}
const getFile = (fileName) => {
    fsPromises.readdir(path.join(__dirname, "./files")).then(data => {
        if (!data.includes(fileName)) {
            console.log(chalk.bgRed(`The file ${fileName} wosn't found`))
            return;
        }
        fsPromises.readFile(path.join(__dirname, "./files", fileName), "utf-8").then(content => {
            fsPromises.stat(path.join(__dirname, "./files", fileName)).then(data => {
                console.log({
                    message: "Success",
                    fileName,
                    content,
                    extention: checkExtention(fileName).extention,
                    size: data.size + "b",
                    date: data.birthtime.toString(),
                })
            }).catch(error => console.log(chalk.red(error)))
        }).catch(error => console.log(chalk.red(error)))
    }).catch(error => console.log(chalk.red(error)))
}

module.exports = {
    createFile,
    getFiles,
    getFile,
}


//=========================================================
// const createFile = (fileName, content) => {
//     const data = {
//         fileName,
//         content,
//     }
//     const result = dataValidator(data);
//     if (result.error) {
//         console.log(chalk.red(`Please, specify ${result.error.details[0].context?.key} parametr`))
//         return;
//     }
//     const checkData = checkExtention(fileName)
//     if (!checkData.isCorrected) {
//         console.log(chalk.red(`Sorry, application doesn't support ${checkData.extention} extention`))
//         return;
//     }
//     fsPromises.writeFile(path.join(__dirname, "./files", fileName), content, "utf-8").then(() => console.log(chalk.green("File created success")))
//         .catch(error => console.log(chalk.red(error)))
// }