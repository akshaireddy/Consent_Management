import { ethers } from "hardhat";
// const { ethers } = require('hardhat');
require('dotenv').config();

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);

    const ConsentManagement = await ethers.getContractFactory('ConsentManagement');
    const consentManagement = await ConsentManagement.deploy();

    console.log('ConsentManagement deployed to:', consentManagement.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
