const { spawn } = require('node:child_process');

const bat = spawn('cmd.exe', ['/c', 'dir "C:\Program Files\n"']);

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.error(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});


// exec('"C:\Program Files\QCAD\dwg2pdf.bat" arg1 arg2')
// const util = require('node:util');
// const exec = util.promisify(require('node:child_process').exec);

// async function lsExample() {
//   const { stdout, stderr } = await exec('cd "C:\Program Files\QCAD\dwg2pdf.bat"');
//   console.log('stdout:', stdout);
//   console.error('stderr:', stderr);
// }

// lsExample();
