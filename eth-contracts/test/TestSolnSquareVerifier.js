const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const SquareVerifier = artifacts.require("SquareVerifier");
const proofJson = require('../../zokrates/code/square/proof.json');

// Test if a new solution can be added for contract - SolnSquareVerifier
const truffleAssert = require('truffle-assertions');

contract('TestSolnSquareVerifier', async(accounts) => {
  let verifier, solutionSV;
  describe('Test', () => {
    beforeEach('setup test environment', async function () { 
      verifier = await SquareVerifier.new(accounts);
      solutionSV = await SolnSquareVerifier.new(verifier.address);
    })
  
    describe('match soln square verifier spec', function () {
      // Test if a new solution can be added for contract - SolnSquareVerifier
      it('should add a new solution for contract SolnSquareVerifier', async function () { 
          let _id = 123;
          let _owner = accounts[0];
          let result = await solutionSV.addSolution(_id, _owner);
          assert.equal(result.logs[0].event, 'SolutionAdded')
          // truffleAssert.eventEmitted(result, 'SolutionAdded', (ev)=>{
          //     //The id and owner emitted with the event should equal _id and _owner
          //     return ev._index == _id && ev._address == _owner;
          // });
      })
  
      // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
      it('should mint new token by ERC721', async function () {
        let _id = 123;
        const { proof, inputs } = proofJson;

        var result = await solutionSV.mintNtf.call(_id, proof.a, proof.b, proof.c, inputs);
        assert.equal(result, true, "Failed to mint a new token"); 
      })
    })
  })
})
