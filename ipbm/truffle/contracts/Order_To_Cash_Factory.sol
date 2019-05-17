
pragma solidity ^0.5.0;

import "AbstractFactory";
import "AbstractProcess";
import "AbstractRegistry";
import "Order_To_Cash_Contract";

contract Order_To_Cash_Factory is AbstractFactory {
    function newInstance(address parent, address processRegistry) public returns(address) {
        Order_To_Cash_Contract newContract = new Order_To_Cash_Contract(parent, worklist, processRegistry);
        return address(newContract);
    }

    function startInstanceExecution(address processAddress) public {
        Order_To_Cash_Contract(processAddress).startExecution();
    }
}
