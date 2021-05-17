var ERC721MintableComplete = artifacts.require('./ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];
    const account_seven = accounts[6];

    console.log('account', account_one, account_two, account_three)
    let counter = 0;
    let contract;
    describe('Contract', () => {
        before(async function () { 
            try {
                contract = await ERC721MintableComplete.new({from: account_one});
                
                // TODO: mint multiple tokens
                await contract.mint(account_three, counter++, { from: account_one });
                await contract.mint(account_four, counter++, { from: account_one });
                await contract.mint(account_three, counter++, { from: account_one });
                await contract.mint(account_three, counter++, { from: account_one });
            } catch (ex) {
                console.log(ex)
            }
        })
        describe('match erc721 spec', function () {
    
            it('should return total supply', async function () { 
                const supply = await contract.totalSupply();
                assert.equal(supply, 4, 'Total supply does not match minted tokens');
            })
    
            it('should get token balance', async function () { 
                const balance = await contract.balanceOf(account_three)
                assert.equal(balance, 3, 'Balance does not match')
            })
    
            // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
            it('should return token uri', async function () { 
                const tokenUri = await contract.tokenURI(0, { from: account_one });
                assert.equal(tokenUri, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/' + '0');
            })
    
            it('should transfer token from one owner to another', async function () { 
                await contract.transferOwnership(account_two, { from: account_one });
                const newOwner = await contract.owner();
                assert.equal(newOwner, account_two)
            })
        });
    
        describe('have ownership properties', function () {
    
            it('should fail when minting when address is not contract owner', async function () { 
                let failed = false;
                try {
                    await contract.mint(account_seven, 10, {from: account_three});
                } catch(ex) {
                    console.log(ex.reason)
                    failed = true;
                }
                assert.equal(failed, true)
            })
    
            it('should return contract owner', async function () { 
                var result = await contract.owner();
                assert.equal(result, account_two, "Contract Owner not returned correctly")
            })
    
        });
    })
})