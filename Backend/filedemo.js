import fs from "node:fs/promises"
const filepath="userdata.txt"
async function createFile(content){
    try{
        await fs.writeFile(filepath,content,"UTF-8");
        console.log("File created successfully");
        
    }
    catch(err){}
}
async function readFile(content){
    try {
        fs.readFile(filepath,'UTF-8');
    }
    catch(err){}
}
async function appendFile(content){
    try {
        fs.appendFile(filepath,content,'UTF-8');
    }
    catch(err){}
}
async function deleteFile(content){
    try {
        fs.unlink(filepath,'UTF-8');
        console.log("file deleted successfully");
    }
    catch(err){}
}
export default (createFile,readFile)
createFile("Hello world");
appendFile("/n this is an append file");
readFile();

