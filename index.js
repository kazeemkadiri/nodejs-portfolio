const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

function sendErrorResponse(err, response){
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.write(err + "\n");
    response.end();
}

const server = http.createServer((request, response) => {
    const urlPath = url.parse(request.url).pathname;
    
    try{
        // route handling 
        switch(urlPath){
            case '/':
                let homeFilePath = path.join(__dirname, 'pages/home.html');

                fs.readFile(homeFilePath, "utf8", function(err, file) {
                    if(err) {        
                        sendErrorResponse(err, response);
                        return;
                    }
            
                    response.writeHead(200, {"Content-Type": "text/html"}).end(file);
                    
                });
            break;
            case '/about-me':
                let aboutFilePath = path.join(__dirname, 'pages/about.html');

                fs.readFile(aboutFilePath, "utf8", function(err, file) {
                    if(err) {        
                        sendErrorResponse(err, response);
                        return;
                    }
            
                    response.writeHead(200, {"Content-Type": "text/html"}).end(file);
                    
                });
            break;
            case '/contact':
                let contactFilePath = path.join(__dirname, 'pages/contact.html');

                fs.readFile(contactFilePath, "utf8", function(err, file) {
                    if(err) {        
                    sendErrorResponse(err, response);
                    return;
                    }
            
                    response.writeHead(200, {"Content-Type": "text/html"}).end(file);
                    
                });
            break;
            case '/home':
                response.statusCode = 302;
                response.setHeader('location', '/').end();
                break;
            default:
                // No matched path
                sendErrorResponse(new Error('404 page not found'), response);
                break;
        }
    }catch(err){
        console.log(err);
    }
});

server.listen(3001, 'localhost', () => {
    console.log('Server is running on port 3001');
})