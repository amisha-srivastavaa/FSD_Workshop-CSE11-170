import { EventEmitter } from 'events';
const er = new EventEmitter();
er.on('greet', (khushi) => {
    console.log(`Hello, ${khushi}!`);
});
er.on('end', () => {
    console.log('Another event occurred!');
});

er.emit('greet', 'khushi');
er.emit('end');