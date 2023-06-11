"use strict";
const fs = require('fs');
const path = require('path');


const directoryPath="./dist";
const todayDate = new Date();

const copyrightComment = `/*
Copyright of JV ${todayDate.getFullYear()}
*/
`;

const copyrightHtmlComment= `<!-- Copyright of JV ${todayDate.getFullYear()} --> 
`;

console.log(copyrightComment);
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
            switch (extensionOfFile)
            {
                case ".js":
                case ".css":
                case ".scss":
                    appendCopyrightComment(copyrightComment, currentPath);
                    break;
                case ".html":
                    appendCopyrightComment(copyrightHtmlComment, currentPath);
            }
            totolFiles++;
        }
    });
}

function appendCopyrightComment(copyrightComment, currentPath)
{
    fs.readFile(currentPath, 'utf-8', (err, data) => {
        if(err)
        {
            console.log(err);
            return;
        }

        const updatedData = copyrightComment + data;

        fs.writeFile(currentPath, updatedData, 'utf-8', (err)=>{
            if(err)
            {
                console.log(err);
                return;
            }
            console.log("Changed the data");
        })
    })
    console.log("Found javascript file");
}

addCopyRights(directoryPath);
