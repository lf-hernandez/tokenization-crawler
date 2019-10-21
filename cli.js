const commander = require('commander');
const project = require('./package.json')

const {getTokens} = require('./index');

commander.version(project.version, '-v, --version');

commander   
    .command('get-tokens <URL>')
    .option('-u, --url <url>')
    .action(getTokens)