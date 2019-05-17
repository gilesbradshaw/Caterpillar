
pragma solidity ^0.5.0;

import "AbstractFactory";
import "AbstractProcess";
import "AbstractRegistry";
import "Goods_Shipement_AbstractWorklist";

contract Goods_Shipement_Contract is AbstractProcess {

    uint public marking = uint(2);
    uint public startedActivities = 0;
    address[] private subInstanceAddresses;
    mapping(uint => uint) private subInstanceStartedIndexes;


    // Process Variables
    
    constructor(address _parent, address _worklist, address _processRegistry) public AbstractProcess(_parent, _worklist, _processRegistry) {
    }

    function startExecution() public {
        require(marking == uint(2) && startedActivities == 0);
        step(uint(2), 0);
    }

    function handleEvent(bytes32 code, bytes32 eventType, uint _instanceIndex, bool isInstanceCompleted) public {
        (uint256 tmpMarking, uint256 tmpStartedActivities)  = (marking, startedActivities);
        uint maskIndex = uint(1) << _instanceIndex;
        uint sourceChild = 0;
        if (subInstanceStartedIndexes[3] & uint(maskIndex) != 0) {
            if(isInstanceCompleted)
                subInstanceStartedIndexes[3] &= uint(~maskIndex);
            if (eventType == "Default") {
                if (subInstanceStartedIndexes[3] == 0)
                    step(tmpMarking | uint(8), tmpStartedActivities & uint(~8));
            }
        }
        else {
            (tmpMarking, tmpStartedActivities) = propagateEvent(code, eventType, tmpMarking, tmpStartedActivities, sourceChild);
            step(tmpMarking, tmpStartedActivities);
        }
    }

    function killProcess() public {
        (marking, startedActivities) = killProcess(0, marking, startedActivities);
    }

    function killProcess(uint processElementIndex, uint tmpMarking, uint tmpStartedActivities) internal returns(uint, uint) {
        uint externalContracts2Stop = 0;
        uint allAddresses2Stop = 0;
        if(processElementIndex == 0) {
            tmpMarking = tmpStartedActivities = 0;
            externalContracts2Stop = uint(8);
        }
        if(externalContracts2Stop & uint(8) != 0) {
            allAddresses2Stop |= subInstanceStartedIndexes[3];
            subInstanceStartedIndexes[3] = 0;
        }
        for(uint j = 0; j < subInstanceAddresses.length; j++)
            if(allAddresses2Stop & (uint(1) << j) != 0)
                AbstractProcess(subInstanceAddresses[j]).killProcess();
        return (tmpMarking, tmpStartedActivities);
    }

    function broadcastSignal() public {
        (uint256 tmpMarking, uint256 tmpStartedActivities) = broadcastSignal(marking, startedActivities, 0);
        step(tmpMarking, tmpStartedActivities);
    }

    function broadcastSignal(uint tmpMarking, uint tmpStartedActivities, uint sourceChild) internal returns(uint, uint) {
        uint contracts2Broadcast = 0;
        if (tmpStartedActivities & uint(8) != 0)
            contracts2Broadcast |= subInstanceStartedIndexes[3];
        contracts2Broadcast &= uint(~sourceChild);
        if(contracts2Broadcast != 0)
            for(uint j = 0; j < subInstanceAddresses.length; j++)
                if(contracts2Broadcast & (uint(1) << j) != 0)
                    AbstractProcess(subInstanceAddresses[j]).broadcastSignal();
        return (tmpMarking, tmpStartedActivities);
    }


    function Ship_Goods_complete(uint elementIndex) external {
        (uint256 tmpMarking, uint256 tmpStartedActivities) = (marking, startedActivities);
        if(elementIndex == uint(1)) {
            require(msg.sender == worklist && tmpStartedActivities & uint(2) != 0);
            step(tmpMarking | uint(4), tmpStartedActivities & uint(~2));
            return;
        }
    }
    function Request_Quotes_complete(uint elementIndex) external {
        (uint256 tmpMarking, uint256 tmpStartedActivities) = (marking, startedActivities);
        if(elementIndex == uint(4)) {
            require(msg.sender == worklist && tmpStartedActivities & uint(16) != 0);
            step(tmpMarking | uint(16), tmpStartedActivities & uint(~16));
            return;
        }
    }

    function createNewSubprocessInstance(uint nodeIndex) private {
        AbstractProcess child = AbstractProcess(AbstractRegistry(processRegistry).newInstanceFor(nodeIndex, address(this)));
        uint index = subInstanceAddresses.length;
        subInstanceAddresses.push(address(child));
        subInstanceStartedIndexes[nodeIndex] |= (uint(1) << index);
        child.setInstanceIndex(index);
    }

    function step(uint tmpMarking, uint tmpStartedActivities) internal {
        while (true) {
            if (tmpMarking & uint(8) != 0) {
                Goods_Shipement_AbstractWorklist(worklist).Ship_Goods_start(1);
                tmpMarking &= uint(~8);
                tmpStartedActivities |= uint(2);
                continue;
            }
            if (tmpMarking & uint(4) != 0) {
                tmpMarking &= uint(~4);
                if (tmpMarking & uint(30) == 0 && tmpStartedActivities & uint(26) == 0) {
                    (tmpMarking, tmpStartedActivities) = propagateEvent("Goods_Shipment_Completed", "Default", tmpMarking, tmpStartedActivities, uint(4));
                }
                continue;
            }
            if (tmpMarking & uint(16) != 0) {
                for(uint i = 0; i < 2; i++) {
                    createNewSubprocessInstance(3);
                }
                tmpMarking &= uint(~16);
                tmpStartedActivities |= 8;
                continue;
            }
            if (tmpMarking & uint(2) != 0) {
                Goods_Shipement_AbstractWorklist w = Goods_Shipement_AbstractWorklist(worklist);
                // Goods_Shipement_AbstractWorklist(worklist).Request_Quotes_start(4);
                tmpMarking &= uint(~2);
                tmpStartedActivities |= uint(16);
                continue;
            }
            break;
        }
        if(marking != 0 || startedActivities != 0) {
            marking = tmpMarking;
            startedActivities = tmpStartedActivities;
        }
    }

    function getWorklistAddress() external view returns(address) {
        return worklist;
    }

    function getInstanceIndex() external view returns(uint) {
        return instanceIndex;
    }

    function allInstanceAddresses() external view returns(address [] memory) {
        return subInstanceAddresses;
    }

    function startedInstanceIndexFor(uint instanceNode) external view returns(uint) {
        return subInstanceStartedIndexes[instanceNode];
    }

}
