pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;
import './SquareVerifier.sol';
import './ERC721Mintable.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {
  // TODO define a solutions struct that can hold an index & an address
  struct Solution {
    uint8 _index;
    address _address;
    bool exists;
  }
  SquareVerifier public squareVerifier;

  // TODO define an array of the above struct
  // Solution[] solutions;

  // TODO define a mapping to store unique solutions submitted
  mapping(uint8 => Solution) solutions; 

  // TODO Create an event to emit when a solution is added
  event SolutionAdded(uint8 _index, address _address);

  constructor(address verifierAddress) public {
    squareVerifier = SquareVerifier(verifierAddress);
  }

  // TODO Create a function to add the solutions to the array and emit the event
  function addSolution(uint8 _index, address _address) public {
    Solution memory sol = solutions[_index];
    require(!sol.exists == true, 'Solution already exists');
    solutions[_index] = Solution(_index, _address, true);
    emit SolutionAdded(_index, _address);
  } 

  function mintNtf(
    uint8 _index,
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c, uint[2] memory input
  ) public returns(bool result) {
      bool isVerified = squareVerifier.verifyTx(a, b, c, input);
      require(isVerified == true, "Cannot mint a new token- Verification failed");
      addSolution(_index, msg.sender);  
      result = mint(msg.sender, _index);
      require(result == true, 'Error minting token');
  }
}

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  


























