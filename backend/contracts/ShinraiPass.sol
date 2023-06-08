// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

interface TicketContract {
    function setMetadata(string memory _newMetadata) external;

    function setDate(uint _year, uint _month, uint _day) external;

    function setVenue(string memory _venue) external;

    function setPrice(uint _price) external;

    function setMaxSupply(uint _maxSupply) external;

    function setMaxAllocationPerUser(uint _maxAllocation) external;

    function setSalePhase(bool _phase) external;

    function ownerMint(uint _amount) external returns (uint[] memory);

    function mint(uint _amount) external payable returns (uint[] memory);

    function withdrawFunds() external;

    function getTotalSupply() external view returns (uint);
}

contract ShinraiPass is Ownable {
    uint public numberOfEvents;

    struct eventData {
        uint id;
        string showName;
        string venue;
        string description;
        string imageUrl;
        uint year;
        uint month;
        uint day;
        uint price;
        uint numberOfTickets;
        uint purchaseLimit;
        bool isSaleEnabled;
        address eventAddress;
        address owner;
    }

    struct ticketData {
        uint eventId;
        uint ticketId;
        string showName;
        string venue;
        string description;
        string imageUrl;
        uint year;
        uint month;
        uint day;
        uint price;
        address owner;
    }

    eventData[] private allEvents;

    mapping(address => eventData[]) private userEvents;
    mapping(address => ticketData[]) private userTickets;
    mapping(address => mapping(uint => uint)) public userEventTicketCount;

    receive() external payable {}

    function showEventData(uint _id) external view returns (eventData memory) {
        return allEvents[_id];
    }

    function showAllEvents() external view returns (eventData[] memory) {
        eventData[] memory events = new eventData[](numberOfEvents);
        for (uint i = 0; i < numberOfEvents; i++) {
            eventData storage eventItem = allEvents[i];
            events[i] = eventItem;
        }
        return events;
    }

    function showEventsPerDeployer(
        address _deployer
    ) external view returns (eventData[] memory) {
        eventData[] memory deployerEvents = new eventData[](
            userEvents[_deployer].length
        );
        for (uint i = 0; i < userEvents[_deployer].length; i++) {
            eventData storage eventItem = userEvents[_deployer][i];
            deployerEvents[i] = eventItem;
        }
        return deployerEvents;
    }

    function showUserTickets(
        address _user
    ) external view returns (ticketData[] memory) {
        ticketData[] memory allTickets = new ticketData[](
            userTickets[_user].length
        );

        for (uint i = 0; i < userTickets[_user].length; i++) {
            ticketData storage data = userTickets[_user][i];
            allTickets[i] = data;
        }
        return allTickets;
    }

    function getEventTotalSupply(uint id) external view returns (uint) {
        uint totalSupply = TicketContract(allEvents[id].eventAddress)
            .getTotalSupply();
        return totalSupply;
    }

    function createEvent(
        string memory _showName,
        string memory _venue,
        string memory _description,
        string memory _imageUrl,
        uint _year,
        uint _month,
        uint _day,
        uint _price,
        uint _numberOfTickets,
        uint _purchaseLimit,
        address _eventAddress
    ) external {
        eventData memory newEvent = eventData(
            numberOfEvents,
            _showName,
            _venue,
            _description,
            _imageUrl,
            _year,
            _month,
            _day,
            _price,
            _numberOfTickets,
            _purchaseLimit,
            false,
            _eventAddress,
            msg.sender
        );

        allEvents.push(newEvent);
        userEvents[msg.sender].push(newEvent);
        numberOfEvents++;
    }

    function changeMetadata(
        uint _id,
        string memory _newMetadata,
        string memory _newImageUrl
    ) external {
        require(
            allEvents[_id].owner == msg.sender,
            "only the owner can make changes"
        );
        eventData storage _eventData = allEvents[_id];
        _eventData.imageUrl = _newImageUrl;
        TicketContract(allEvents[_id].eventAddress).setMetadata(_newMetadata);
    }

    function changeDate(uint _id, uint _year, uint _month, uint _day) external {
        require(allEvents[_id].owner == msg.sender);
        TicketContract(allEvents[_id].eventAddress).setDate(
            _year,
            _month,
            _day
        );
        eventData storage _eventData = allEvents[_id];
        _eventData.year = _year;
        _eventData.month = _month;
        _eventData.day = _day;
    }

    function changeShowName(uint _id, string memory _newName) external {
        require(allEvents[_id].owner == msg.sender);
        eventData storage _eventData = allEvents[_id];
        _eventData.showName = _newName;
    }

    function changeVenue(uint _id, string memory _newVenue) external {
        require(allEvents[_id].owner == msg.sender);
        TicketContract(allEvents[_id].eventAddress).setVenue(_newVenue);
        eventData storage _eventData = allEvents[_id];
        _eventData.venue = _newVenue;
    }

    function changeDescription(
        uint _id,
        string memory _newDescription
    ) external {
        require(allEvents[_id].owner == msg.sender);
        eventData storage _eventData = allEvents[_id];
        _eventData.description = _newDescription;
    }

    function changePrice(uint _id, uint _newPrice) external {
        require(allEvents[_id].owner == msg.sender);
        TicketContract(allEvents[_id].eventAddress).setPrice(_newPrice);
        eventData storage _eventData = allEvents[_id];
        _eventData.price = _newPrice;
    }

    function changeSupply(uint _id, uint _newSupply) external {
        require(allEvents[_id].owner == msg.sender);
        TicketContract(allEvents[_id].eventAddress).setMaxSupply(_newSupply);
        eventData storage _eventData = allEvents[_id];
        _eventData.numberOfTickets = _newSupply;
    }

    function changeAllocationPerUser(uint _id, uint _newAllocation) external {
        require(allEvents[_id].owner == msg.sender);
        TicketContract(allEvents[_id].eventAddress).setMaxAllocationPerUser(
            _newAllocation
        );
        eventData storage _eventData = allEvents[_id];
        _eventData.purchaseLimit = _newAllocation;
    }

    function changeSalePhase(uint _id, bool _phase) external {
        require(allEvents[_id].owner == msg.sender);
        TicketContract(allEvents[_id].eventAddress).setSalePhase(_phase);
        eventData storage _eventData = allEvents[_id];
        _eventData.isSaleEnabled = _phase;
    }

    function ownerMint(uint _id, uint _amount) external {
        require(allEvents[_id].owner == msg.sender);
        uint[] memory ticketIds = TicketContract(allEvents[_id].eventAddress)
            .ownerMint(_amount);

        userEventTicketCount[msg.sender][_id] += _amount;
        eventData storage eventInfo = allEvents[_id];
        for (uint i = 0; i < _amount; i++) {
            ticketData memory data = ticketData(
                _id,
                ticketIds[i],
                eventInfo.showName,
                eventInfo.venue,
                eventInfo.description,
                eventInfo.imageUrl,
                eventInfo.year,
                eventInfo.month,
                eventInfo.day,
                eventInfo.price,
                msg.sender
            );
            userTickets[msg.sender].push(data);
        }
    }

    function buyTicket(uint _id, uint _amount) external payable {
        require(msg.sender == tx.origin);
        uint[] memory ticketIds = TicketContract(allEvents[_id].eventAddress)
            .mint{value: msg.value}(_amount);
        userEventTicketCount[msg.sender][_id] += _amount;
        eventData storage eventInfo = allEvents[_id];
        for (uint i = 0; i < _amount; i++) {
            ticketData memory data = ticketData(
                _id,
                ticketIds[i],
                eventInfo.showName,
                eventInfo.venue,
                eventInfo.description,
                eventInfo.imageUrl,
                eventInfo.year,
                eventInfo.month,
                eventInfo.day,
                eventInfo.price,
                msg.sender
            );
            userTickets[msg.sender].push(data);
        }
    }

    function withdrawUserFunds(uint _id) external {
        require(allEvents[_id].owner == msg.sender);
        TicketContract(allEvents[_id].eventAddress).withdrawFunds();
    }

    function withdrawShinraiPassFunds() external {
        require(msg.sender == owner());
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success);
    }
}
