pragma solidity ^0.5.0;

import "AbstractWorklist";

contract Goods_Shipment_AbstractWorklist {

      function Ship_Goods_start(uint) external;
      function Request_Quotes_start(uint) external;
  
      function Ship_Goods_complete(uint) external;
      function Request_Quotes_complete(uint) external;
  
}
