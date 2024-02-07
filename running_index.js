const functions = require('@google-cloud/functions-framework');
const GcmSynthetics = require('@google-cloud/synthetics-sdk-broken-links');

const options = {
  origin_uri: 'https://assurx.ikshealth.com',
  link_limit: 25,
  query_selector_all: 'a,img,script',
  wait_for_selector: '',
  get_attributes: ["href","src"],
  link_order: 'FIRST_N',
  link_timeout_millis: 30000,
  max_retries: 0,
  per_link_options: {
	}
};
functions.http('BrokenLinkChecker', GcmSynthetics.runBrokenLinksHandler(options));
