pragma solidity ^0.5.0;

contract TaskRoleContract_Contract {

    function getRoleFromTask(uint taskIndex, bytes32 processId) public pure returns(uint) {
        if (processId == '5cdc8833fa690205fdba5b0f') {
            uint[3] memory I5cdc8833fa690205fdba5b0f = [uint(0), 1, 2];
            if(taskIndex < 3)
                return I5cdc8833fa690205fdba5b0f[taskIndex];
        }
        if (processId == '5cdc87c3fa690205fdba5b0d') {
            uint[5] memory I5cdc87c3fa690205fdba5b0d = [uint(0), 4, 0, 0, 2];
            if(taskIndex < 5)
                return I5cdc87c3fa690205fdba5b0d[taskIndex];
        }
        if (processId == '5cdc87c3fa690205fdba5b0c') {
            uint[6] memory I5cdc87c3fa690205fdba5b0c = [uint(0), 0, 0, 0, 0, 3];
            if(taskIndex < 6)
                return I5cdc87c3fa690205fdba5b0c[taskIndex];
        }
        if (processId == '5cdc87e2fa690205fdba5b0e') {
            uint[7] memory I5cdc87e2fa690205fdba5b0e = [uint(0), 5, 6, 0, 0, 0, 5];
            if(taskIndex < 7)
                return I5cdc87e2fa690205fdba5b0e[taskIndex];
        }
        return 0;
    }
}