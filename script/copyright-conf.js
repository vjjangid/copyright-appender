"use strict";
const fs = require('fs');
const path = require('path');


const directoryPath="./dist";
const todayDate = new Date();

const copyright = `/**
* Copyright of JV ${todayDate.getFullYear()}
*/
`;

console.log(copyright);
let totalDir = 0;
let totolFiles = 0;

function addCopyRights(directoryPath)
{
    const files = fs.readdirSync(directoryPath);
    files.forEach( (file)=>{
        const currentPath = path.join(directoryPath, file);
        const stats = fs.statSync(currentPath);
        
        if(stats.isDirectory())
        {
            totalDir++;
            addCopyRights(currentPath)
        }
        else
        {
            //It is file add copyright
            const extensionOfFile = path.extname(currentPath);
            if(extensionOfFile == ".js")
            {
                console.log("Found javascript file");
            }
            totolFiles++;
        }
    });
}

addCopyRights(directoryPath);

console.log("total files are" + totolFiles);
console.log("total directories are " +totalDir);