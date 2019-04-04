const { spawn, exec } = require('child_process');

const someProcess = spawn('ping.exe', ['google.com']);

someProcess.on('close', (code, signal) => {
    console.log('someProcess was killed', code, signal);
});

console.log('killing someProcess');
someProcess.kill('SIGKILL');
console.log('after kill');
