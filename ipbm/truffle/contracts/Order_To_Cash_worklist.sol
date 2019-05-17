
pragma solidity ^0.5.0;

import "AbstractWorklist";
import "Order_To_Cash_AbstractWorklist";

contract Order_To_Cash_worklist is AbstractWorklist {

    // Events with the information to include in the Log when a workitem is registered
    event Submit_PO_Requested(uint);
    event Validate_PO_Requested(uint);

    function Submit_PO_start(uint elementIndex) external {
        workitems.push(Workitem(elementIndex, msg.sender));
        emit Submit_PO_Requested(workitems.length - 1);
    }
    function Validate_PO_start(uint elementIndex) external {
        workitems.push(Workitem(elementIndex, msg.sender));
        emit Validate_PO_Requested(workitems.length - 1);
    }

    function Submit_PO(uint workitemId) external {

        require(workitemId < workitems.length && workitems[workitemId].processInstanceAddr != address(0) && 
        canPerform(msg.sender, workitems[workitemId].processInstanceAddr, workitems[workitemId].elementIndex));
        
        Order_To_Cash_AbstractWorklist(workitems[workitemId].processInstanceAddr).Submit_PO_complete(workitems[workitemId].elementIndex);
        workitems[workitemId].processInstanceAddr = address(0);
    }
    function Validate_PO(uint workitemId, bool _poStatus) external {

        require(workitemId < workitems.length && workitems[workitemId].processInstanceAddr != address(0) && 
        canPerform(msg.sender, workitems[workitemId].processInstanceAddr, workitems[workitemId].elementIndex));
        
        Order_To_Cash_AbstractWorklist(workitems[workitemId].processInstanceAddr).Validate_PO_complete(workitems[workitemId].elementIndex, _poStatus);
        workitems[workitemId].processInstanceAddr = address(0);
    }

}
