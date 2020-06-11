const shim = require('fabric-shim');
const util = require('util');

var Chaincode = class {
  async Init(stub) {
  }
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    let method = this[ret.fcn];
    if (!method) {
      console.log('no method of name:' + ret.fcn + ' found');
      return shim.success();
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }
  async createOrder(stub,args){
    if(args.length != 5){
        throw new Error('Incorrect number of arguments. Expecting 3');
    }
  }
  async viewOrder(stub){
        if (args.length != 1) {
        throw new Error('Incorrect number of arguments. Expecting name of the person to query')
        }
        let jsonResp = {};
        let orderID = args[0];
        let orderbytes = await stub.getState(orderID);
        if (!orderbytes) {
        jsonResp.error = 'Failed to get state for ' + orderID;
        throw new Error(JSON.stringify(jsonResp));
        }
        jsonResp.name = ;
        jsonResp = JSON.parse(orderbytes.toString());
        console.info(jsonResp);
        return jsonResp;
    }
};

shim.start(new Chaincode());
