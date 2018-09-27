import html from '../../index.html'
import css from '../scss/index.scss'

import { Local } from './modules/local';
import { Remote } from './modules/remote';
import io from 'socket.io-client';
var PORT = require('./../../port') || 3001;

window.onload = e => {
    const socket = io(`http://localhost:${PORT}/`);
    const local = new Local(socket);
    const remote = new Remote(socket);
    socket.on('waiting', function(mes){
        document.getElementById('waiting').innerHTML = mes;
    });
}

console.log(1)