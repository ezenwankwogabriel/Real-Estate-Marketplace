var ERC721MintableComplete = artifacts.require('./ERC721MintableComplete');

var Config = async function(accounts) {
    
  // These test addresses are useful when you need to add
  // multiple users in test scripts
  

  let owner = accounts[0];

  const account_one = accounts[1];
  const account_two = accounts[2];
  const account_three = accounts[3];
  
  let contract = await ERC721MintableComplete.new({from: owner});

  // TODO: mint multiple tokens
  var result1 = await contract.mint(account_one, 123, {from: owner});
  var result2 = await contract.mint(account_two, 456, {from: owner});
  var result3 = await contract.mint(account_three, 789, {from: owner});
  
  return {
      owner: owner,
      account_one: account_one,
      account_two: account_two,
      account_three: account_three,
      contract: contract
  }
}

module.exports = {
  Config: Config
};
