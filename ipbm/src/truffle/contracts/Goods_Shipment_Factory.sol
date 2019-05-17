
pragma solidity ^0.5.0;

import "AbstractFactory";
import "AbstractProcess";
import "AbstractRegistry";
import "Goods_Shipment_Contract";

contract Goods_Shipment_Factory is AbstractFactory {
    function newInstance(address parent, address processRegistry) public returns(address) {
        Goods_Shipment_Contract newContract = new Goods_Shipment_Contract(parent, worklist, processRegistry);
        return address(newContract);
    }

    function startInstanceExecution(address processAddress) public {
        Goods_Shipment_Contract(processAddress).startExecution();
    }
}
