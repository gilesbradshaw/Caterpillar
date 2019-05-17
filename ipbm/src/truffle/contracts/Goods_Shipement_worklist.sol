
pragma solidity ^0.5.0;

import "AbstractWorklist";
import "Goods_Shipement_AbstractWorklist";

contract Goods_Shipement_worklist is AbstractWorklist {

    // Events with the information to include in the Log when a workitem is registered
    event Ship_Goods_Requested(uint);
    event Request_Quotes_Requested(uint);

    function Ship_Goods_start(uint elementIndex) external {
        workitems.push(Workitem(elementIndex, msg.sender));
        emit Ship_Goods_Requested(workitems.length - 1);
    }
    function Request_Quotes_start(uint elementIndex) external {
        workitems.push(Workitem(elementIndex, msg.sender));
        emit Request_Quotes_Requested(workitems.length - 1);
    }

    function Ship_Goods(uint workitemId) external {

        require(workitemId < workitems.length && workitems[workitemId].processInstanceAddr != address(0) && 
        canPerform(msg.sender, workitems[workitemId].processInstanceAddr, workitems[workitemId].elementIndex));
        
        Goods_Shipement_AbstractWorklist(workitems[workitemId].processInstanceAddr).Ship_Goods_complete(workitems[workitemId].elementIndex);
        workitems[workitemId].processInstanceAddr = address(0);
    }
    function Request_Quotes(uint workitemId) external {

        require(workitemId < workitems.length && workitems[workitemId].processInstanceAddr != address(0) && 
        canPerform(msg.sender, workitems[workitemId].processInstanceAddr, workitems[workitemId].elementIndex));
        
        Goods_Shipement_AbstractWorklist(workitems[workitemId].processInstanceAddr).Request_Quotes_complete(workitems[workitemId].elementIndex);
        workitems[workitemId].processInstanceAddr = address(0);
    }

}
