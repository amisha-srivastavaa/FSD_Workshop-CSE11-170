import http from 'http';
const messages = [];
const userData=[];

const server = http.createServer((req, res) => {
    const url=req.url;
    const method=req.method;
    if(url=="/msg" && method=="GET"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World Successful\n');
    }else if(url.startsWith("/users/") && method=="GET"){
        const id=url.split("/")[2];
        const user=userData.find((u)=> u.id==id);
        if(!user){
            return res.end("User not found");
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(user));
    }else if(url=="/create" && method=="POST"){
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk.toString();
        });
        req.on("end",()=>{
            const data=JSON.parse(body);
            const newUser={
                id: data.id,
                name: data.name,
                email: data.email};
            userData.push(newUser);
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('User created successfully\n');
        });
    }else if(url=="/messages" && method=="POST"){
        let body="";
        req.on("data",(chunk)=>{
            body+=chunk.toString();
        });
        req.on("end",()=>{
            messages.push(body);
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('Message received successfully\n');
        }); 
        req.on("error",(err)=>{
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error\n');
        });
        res.on("error",(err)=>{
            console.error(err);
        });
    }
    res.on("error",(err)=>{
        console.error(err);
    });
});
userData.splice(index, 1);
res.on("error",(err)=>{
    console.error(err);
}
);
const port = 3000;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}/`); 
});
