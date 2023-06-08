// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./DateTime.sol";

contract Ticket is ERC721A {
    using DateTime for uint;

    uint public price;
    uint public maxSupply;
    uint public maxAllocationPerAddress;
    uint public date;
    string public eventName;
    string public venue;
    bool public isSaleEnabled;
    string private metadata;
    address private shinraiPassAddress;
    address private owner;

    mapping(address => uint) public ticketsBought;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadata,
        string memory _venue,
        uint _year,
        uint _month,
        uint _day,
        uint _price,
        uint _maxSupply,
        uint _maxAllocationPerAddress,
        address _smartTix
    ) ERC721A(_name, _symbol) {
        price = _price;
        metadata = _metadata;
        eventName = _name;
        venue = _venue;
        date = DateTime.timestampFromDate(_year, _month, _day);
        maxSupply = _maxSupply;
        maxAllocationPerAddress = _maxAllocationPerAddress;
        isSaleEnabled = false;
        owner = msg.sender;
        shinraiPassAddress = _smartTix;
    }

    function _startTokenId() internal view override returns (uint256) {
        return 1;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return metadata;
    }

    function getTotalSupply() external view returns (uint) {
        return totalSupply();
    }

    function setMetadata(string memory _newMetadata) external {
        require(msg.sender == shinraiPassAddress);
        require(
            keccak256(abi.encodePacked(_newMetadata)) !=
                keccak256(abi.encodePacked("")),
            "you cannot assign an empty value"
        );
        metadata = _newMetadata;
    }

    function setDate(uint _year, uint _month, uint _day) external {
        require(msg.sender == shinraiPassAddress);
        uint _newDate = DateTime.timestampFromDate(_year, _month, _day);
        require(
            _newDate > block.timestamp,
            "The event must happen in a future date"
        );
        date = _newDate;
    }

    function setVenue(string memory _venue) external {
        require(msg.sender == shinraiPassAddress);
        require(
            keccak256(abi.encodePacked(_venue)) !=
                keccak256(abi.encodePacked("")),
            "you cannot assign an empty value"
        );
        venue = _venue;
    }

    function setPrice(uint _price) external {
        require(msg.sender == shinraiPassAddress);
        price = _price;
    }

    function setMaxSupply(uint _maxSupply) external {
        require(msg.sender == shinraiPassAddress);
        require(_maxSupply > 0, "The max supply must be greater than zero");
        maxSupply = _maxSupply;
    }

    function setMaxAllocationPerUser(uint _maxAllocation) external {
        require(msg.sender == shinraiPassAddress);
        require(
            _maxAllocation > 0,
            "The max allocation must be greater than zero"
        );
        maxAllocationPerAddress = _maxAllocation;
    }

    function setSalePhase(bool _phase) external {
        require(msg.sender == shinraiPassAddress);
        isSaleEnabled = _phase;
    }

    function getDate()
        external
        view
        returns (uint256 year, uint256 month, uint256 day)
    {
        (year, month, day) = date.timestampToDate();
    }

    function ownerMint(uint _amount) external returns (uint[] memory) {
        require(msg.sender == shinraiPassAddress);
        require(totalSupply() + _amount <= maxSupply, "Sold Out");
        require(_amount > 0, "Enter a valid amount");
        uint[] memory ticketIds = new uint[](_amount);
        for (uint i = 0; i < _amount; i++) {
            ticketIds[i] = _nextTokenId() + i;
        }
        _safeMint(owner, _amount);
        return ticketIds;
    }

    function mint(uint _amount) external payable returns (uint[] memory) {
        require(msg.sender == shinraiPassAddress);
        require(isSaleEnabled, "Sale not anabled");
        require(block.timestamp < date, "Sale ended");
        require(msg.value >= _amount * price, "Wrong value");
        require(
            ticketsBought[msg.sender] + _amount <= maxAllocationPerAddress,
            "Max allocation per address exceeded"
        );
        require(totalSupply() + _amount <= maxSupply, "Sold Out");

        ticketsBought[msg.sender] += _amount;
        uint[] memory ticketIds = new uint[](_amount);
        for (uint i = 0; i < _amount; i++) {
            ticketIds[i] = _nextTokenId() + i;
        }
        _safeMint(tx.origin, _amount);
        return ticketIds;
    }

    function withdrawFunds() external {
        require(msg.sender == shinraiPassAddress);
        uint contractBalance = address(this).balance;
        uint ownerShare = (contractBalance * 95) / 100;
        uint smartTixFee = contractBalance - ownerShare;

        (bool s1, ) = owner.call{value: ownerShare}("");
        require(s1);

        (bool s2, ) = shinraiPassAddress.call{value: smartTixFee}("");
        require(s2);
    }
}
