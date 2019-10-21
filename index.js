const puppeteer = require('puppeteer');
const {sanitizeUrl} = require('@braintree/sanitize-url');
const fs = require('fs');

exports.getTokens = (async () => {
    let url = sanitizeUrl(process.argv[2]);

    console.log(`Getting tokens for: ${url}`);

    await main(url);

    async function main(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            await page.goto(url);
            await page.waitFor(2000)

            let tokens = await getTokens(page);


            fs.writeFileSync('output.txt', JSON.stringify(tokens, null, 2));

        } catch (error) {
            console.error(error);
        } finally {
            browser.close();
        }


    }

    async function getTokens(page) {
        return await page.evaluate(() => {
            const spans = document.getElementsByTagName('span');
            const tokens = [];

            for (let span of spans) {
                if (span.attributes.key) {
                    tokens.push({
                        key: span.attributes.key.nodeValue,
                        value: span.attributes.key.ownerElement.textContent
                    });
                }
            }

            return tokens;
        });
    }
})();