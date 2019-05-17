
pragma solidity ^0.5.0;

import "AbstractFactory";
import "AbstractProcess";
import "AbstractRegistry";
import "Submit_Quotes_AbstractWorklist";

contract Submit_Quotes_Contract is AbstractProcess {

    uint public marking = uint(32);
    uint public startedActivities = 0;


    // Process Variables
    
    constructor(address _parent, address _worklist, address _processRegistry) public AbstractProcess(_parent, _worklist, _processRegistry) {
    }

    function startExecution() public {
        require(marking == uint(32) && startedActivities == 0);
        step(uint(32), 0);
    }

    function handleEvent(bytes32 code, bytes32 eventType, uint _instanceIndex, bool isInstanceCompleted) public {
        // Process without calls to external contracts.
        // No events to catch !!!
    }

    function killProcess() public {
        (marking, startedActivities) = killProcess(0, marking, startedActivities);
    }

    function killProcess(uint processElementIndex, uint tmpMarking, uint tmpStartedActivities) internal returns(uint, uint) {
        if(processElementIndex == 0)
            tmpMarking = tmpStartedActivities = 0;
        return (tmpMarking, tmpStartedActivities);
    }

    function broadcastSignal() public {
        (uint256 tmpMarking, uint256 tmpStartedActivities) = broadcastSignal(marking, startedActivities, 0);
        step(tmpMarking, tmpStartedActivities);
    }

    function broadcastSignal(uint tmpMarking, uint tmpStartedActivities, uint sourceChild) internal returns(uint, uint) {
        return (tmpMarking, tmpStartedActivities);
    }


    function Submit_Quotes_complete(uint elementIndex) external {
        (uint256 tmpMarking, uint256 tmpStartedActivities) = (marking, startedActivities);
        if(elementIndex == uint(5)) {
            require(msg.sender == worklist && tmpStartedActivities & uint(32) != 0);
            step(tmpMarking | uint(64), tmpStartedActivities & uint(~32));
            return;
        }
    }


    function step(uint tmpMarking, uint tmpStartedActivities) internal {
        while (true) {
            if (tmpMarking & uint(32) != 0) {
                Submit_Quotes_AbstractWorklist(worklist).Submit_Quotes_start(5);
                tmpMarking &= uint(~32);
                tmpStartedActivities |= uint(32);
                continue;
            }
            if (tmpMarking & uint(64) != 0) {
                tmpMarking &= uint(~64);
                if (tmpMarking & uint(96) == 0 && tmpStartedActivities & uint(32) == 0) {
                    (tmpMarking, tmpStartedActivities) = propagateEvent("e1", "Default", tmpMarking, tmpStartedActivities, uint(64));
                }
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

}
