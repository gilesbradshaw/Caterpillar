
pragma solidity ^0.5.0;

import "AbstractFactory";
import "AbstractProcess";
import "AbstractRegistry";
import "Submit_Quotes_Contract";

contract Submit_Quotes_Factory is AbstractFactory {
    function newInstance(address parent, address processRegistry) public returns(address) {
        Submit_Quotes_Contract newContract = new Submit_Quotes_Contract(parent, worklist, processRegistry);
        return address(newContract);
    }

    function startInstanceExecution(address processAddress) public {
        Submit_Quotes_Contract(processAddress).startExecution();
    }
}
