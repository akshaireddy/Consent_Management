const { ethers } = require('hardhat');
require('dotenv').config();

async function main() {
    const [user] = await ethers.getSigners();

    const contractAddress = process.env.CONTRACT_ADDRESS;
    const ConsentManagement = await ethers.getContractFactory('ConsentManagement');
    const consentManagement = await ConsentManagement.attach(contractAddress);

    const purpose = ethers.utils.formatBytes32String('Marketing');
    
    // Give consent
    await consentManagement.connect(user).giveConsent(purpose);
    console.log('Consent given for purpose:', purpose);

    // Check consent
    const hasConsent = await consentManagement.connect(user).checkConsent(user.address, purpose);
    console.log('Has consent?', hasConsent);

    // Revoke consent
    await consentManagement.connect(user).revokeConsent(purpose);
    console.log('Consent revoked for purpose:', purpose);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
