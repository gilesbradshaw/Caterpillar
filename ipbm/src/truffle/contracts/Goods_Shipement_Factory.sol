
pragma solidity ^0.5.0;

import "AbstractFactory";
import "AbstractProcess";
import "AbstractRegistry";
import "Goods_Shipement_Contract";

contract Goods_Shipement_Factory is AbstractFactory {
    function newInstance(address parent, address processRegistry) public returns(address) {
        Goods_Shipement_Contract newContract = new Goods_Shipement_Contract(parent, worklist, processRegistry);
        return address(newContract);
    }

    function startInstanceExecution(address processAddress) public {
        Goods_Shipement_Contract(processAddress).startExecution();
    }
}
