const functions = require('@google-cloud/functions-framework');
const { runBrokenLinksHandler } = require('@google-cloud/synthetics-sdk-broken-links');

const urls = [
  'https://assurx.ikshealth.com',
  'https://careuatdmda.ikshealth.com/',
  'https://glmgoptimix.ikshealth.com/'
];

async function checkBrokenLinks(url) {
  try {
    const options = {
      origin_uri: url,
      link_limit: 25,
      query_selector_all: 'a,img,script',
      wait_for_selector: '',
      get_attributes: ["href","src"],
      link_order: 'FIRST_N',
      link_timeout_millis: 30000,
      max_retries: 0,
      per_link_options: {}
    };
    const result = await runBrokenLinksHandler(options);
    console.log(`Broken links check for ${url} successful:`, result);
    return result;
  } catch (error) {
    console.error(`Error checking broken links for ${url}:`, error);
    throw error;
  }
}

async function handleMultipleUrls(urls) {
  try {
    const results = await Promise.all(urls.map(url => checkBrokenLinks(url)));
    console.log('All URL checks completed:', results);
  } catch (error) {
    console.error('Error handling multiple URLs:', error);
    throw error;
  }
}

functions.http('BrokenLinkChecker', async (req, res) => {
  try {
    await handleMultipleUrls(urls);
    res.status(200).send('All URL checks completed.');
  } catch (error) {
    console.error('Error handling multiple URLs:', error);
    res.status(500).send('Internal Server Error.');
  }
});
