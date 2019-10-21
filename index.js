const fs = require('fs');

const puppeteer = require('puppeteer');
const { sanitizeUrl } = require('@braintree/sanitize-url');

const tokenizationHelper = require('./helpers/tokenizationHelper');

exports.runTokenizationCrawler = (async () => {
    const url = sanitizeUrl(process.argv[2]);

    console.log(`Getting tokens for: ${url}`);

    await main(url);

    async function main(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const outDir = `${__dirname}/out`;

        try {
            await page.goto(url, { waitUntil: 'networkidle0' });

            const tokens = await tokenizationHelper.getPageTokens(page);

            console.log(`${tokens.length} tokens found`);

            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir);
            }

            console.log('writing output file...');

            fs.writeFileSync(`${outDir}/output.txt`, JSON.stringify(tokens, null, 2));

            console.log('done.');
        } catch (error) {
            console.error(error);
        } finally {
            browser.close();
        }
    }
})();