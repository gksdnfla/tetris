import { Server } from 'socket.io';
import {
    createServer as createServerHttp,
    IncomingMessage,
    ServerResponse,
} from 'http';
import { createServer as createServerHttps } from 'https';
import fs from 'fs';
import path from 'path';

import { EventEmitter } from '../utils/eventEmitter';
import { connection } from './connection';

// Interfaces
import { UserDataInterface } from './interface';

const serve =
    process.env.NODE_ENV === 'development'
        ? createServerHttp(requestServer)
        : createServerHttps(requestServer);
const port = process.env.NODE_ENV === 'development' ? 80 : 443;
const option =
    process.env.NODE_ENV === 'development'
        ? {
              cors: {
                  origin: '*',
                  credentials: true,
              },
          }
        : {};

const io = new Server(serve, option);
const userData: UserDataInterface = {};

connection(io, userData);

serve.listen(port);

function requestServer(req: IncomingMessage, res: ServerResponse): void {
    if (req.url === '/' || req.url === 'index.htm') {
        req.url = '/index.html';
    } else if (/\.htm$/.test(<string>req.url)) {
        req.url += 'l';
    }

    try {
        const indexPath = path.join(__dirname, './public' + req.url);
        const content = fs.readFileSync(indexPath);

        if (/\.html$/.test(<string>req.url)) {
            res.setHeader('Content-Type', 'text/html');
        } else if (/\.css$/.test(<string>req.url)) {
            res.setHeader('Content-Type', 'text/css');
        } else if (/\.(jpg|jpeg|png|gif)$/.test(<string>req.url)) {
            const urlMatched: any[] | null = (<string>req.url).match(
                /\.(jpg|jpeg|png|gif)$/
            );

            if (
                Array.isArray(urlMatched) &&
                typeof urlMatched[1] === 'string'
            ) {
                res.setHeader('Content-Type', urlMatched[1]);
            }
        } else if (/\.js$/.test(<string>req.url)) {
            res.setHeader('Content-Type', 'application/js');
        }

        res.write(content);
    } catch (e) {
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
    }

    res.end();
}
