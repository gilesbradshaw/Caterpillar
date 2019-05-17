pragma solidity ^0.5.0;

import "AbstractWorklist";

contract Order_To_Cash_AbstractWorklist {

      function Submit_PO_start(uint) external;
      function Validate_PO_start(uint) external;
  
      function Submit_PO_complete(uint) external;
      function Validate_PO_complete(uint, bool) external;
  
}
