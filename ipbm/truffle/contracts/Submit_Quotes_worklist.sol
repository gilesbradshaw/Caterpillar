
pragma solidity ^0.5.0;

import "AbstractWorklist";
import "Submit_Quotes_AbstractWorklist";

contract Submit_Quotes_worklist is AbstractWorklist {

    // Events with the information to include in the Log when a workitem is registered
    event Submit_Quotes_Requested(uint);

    function Submit_Quotes_start(uint elementIndex) external {
        workitems.push(Workitem(elementIndex, msg.sender));
        emit Submit_Quotes_Requested(workitems.length - 1);
    }

    function Submit_Quotes(uint workitemId) external {

        require(workitemId < workitems.length && workitems[workitemId].processInstanceAddr != address(0) && 
        canPerform(msg.sender, workitems[workitemId].processInstanceAddr, workitems[workitemId].elementIndex));
        
        Submit_Quotes_AbstractWorklist(workitems[workitemId].processInstanceAddr).Submit_Quotes_complete(workitems[workitemId].elementIndex);
        workitems[workitemId].processInstanceAddr = address(0);
    }

}
