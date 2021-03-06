exports.getPageTokens = async (page) => {
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