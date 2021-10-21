import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xa8b640c44D2A6154bF5915105539D78eE20a884C"
);

export default instance;