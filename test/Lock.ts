// import ///<references types ="ethers">

import { expect } from "chai";
import { ethers } from "hardhat";
import { Apollo } from "../typechain-types/contracts";
import { SaveERC20 } from "../typechain-types/contracts";

describe("SaveERC20", function () {
  let apollo: Apollo;
  let saveERC20:SaveERC20;
 
  beforeEach(async ()=>{
    const initialowner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    const Apollo = await ethers.getContractFactory("Apollo");
    apollo = await Apollo.deploy(initialowner)
    const SaveERC20 = await ethers.getContractFactory("SaveERC20")
    saveERC20 = await SaveERC20.deploy(apollo.target)


  } )

  describe("Deposit", ()=>{
    it("Should deposit Properly", async ()=>{
      const [owner] = await ethers.getSigners();
      const addressBal = await apollo.connect(owner).balanceOf(owner.address)
      await apollo.connect(owner).approve(saveERC20.target, 1000)
      await saveERC20.connect(owner).deposit(1000)
     const userBal = await(saveERC20.connect(owner).checkUserBalance(owner.address))
     expect(userBal).to.equal(1000)
    
  })
  describe.only("Withdraw", ()=>{
    it("Withdraw Properly", async ()=>{
      const [owner] = await ethers.getSigners();
      const addressBal = await apollo.connect(owner).balanceOf(owner.address)
      await apollo.connect(owner).approve(saveERC20.target, 1000)
      await saveERC20.connect(owner).deposit(1000)
      await saveERC20.connect(owner).withdraw(400)
      const userBal = await(saveERC20.connect(owner).checkUserBalance(owner.address))
      console.log (userBal)
    } )
  } )
  
})
  })
