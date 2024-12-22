

var http = require('http');
import { IncomingMessage, ServerResponse } from 'http';

interface RequestListener {
    (req: IncomingMessage, res: ServerResponse): void;
}

const requestListener: RequestListener = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Still alive!');
    res.end();
};

http.createServer(requestListener).listen(8080);