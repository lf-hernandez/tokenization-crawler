const commander = require('commander');
const project = require('./package.json')

const { runTokenizationCrawler } = require('./modules/crawler');

commander.version(project.version, '-v, --version');

commander   
    .command('get-tokens <URL>')
    .option('-u, --url <url>')
    .action(runTokenizationCrawler);