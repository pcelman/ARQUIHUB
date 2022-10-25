const { spawn } = require('node:child_process');

const bat = spawn('cmd.exe', ['/c', 'dir "C:\\Program Files\n"']);

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.error(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});