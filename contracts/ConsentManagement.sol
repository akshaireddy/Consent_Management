// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConsentManagement {
    address public owner;
    
    mapping(address => mapping(bytes32 => bool)) public userConsents;
    
    event ConsentGiven(address indexed user, bytes32 purpose);
    event ConsentRevoked(address indexed user, bytes32 purpose);

    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    function giveConsent(bytes32 purpose) external {
        userConsents[msg.sender][purpose] = true;
        emit ConsentGiven(msg.sender, purpose);
    }
    
    function revokeConsent(bytes32 purpose) external {
        userConsents[msg.sender][purpose] = false;
        emit ConsentRevoked(msg.sender, purpose);
    }
    
    function checkConsent(address user, bytes32 purpose) external view returns (bool) {
        return userConsents[user][purpose];
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
