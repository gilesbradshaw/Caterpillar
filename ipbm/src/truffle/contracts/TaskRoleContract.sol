pragma solidity ^0.5.0;

contract TaskRoleContract_Contract {

    function getRoleFromTask(uint taskIndex, bytes32 processId) public pure returns(uint) {
        if (processId == '5cdebc389ca57c7ff562d017') {
            uint[3] memory I5cdebc389ca57c7ff562d017 = [uint(0), 1, 2];
            if(taskIndex < 3)
                return I5cdebc389ca57c7ff562d017[taskIndex];
        }
        if (processId == '5cdebbe89ca57c7ff562d015') {
            uint[5] memory I5cdebbe89ca57c7ff562d015 = [uint(0), 4, 0, 0, 2];
            if(taskIndex < 5)
                return I5cdebbe89ca57c7ff562d015[taskIndex];
        }
        if (processId == '5cdebbe89ca57c7ff562d014') {
            uint[6] memory I5cdebbe89ca57c7ff562d014 = [uint(0), 0, 0, 0, 0, 3];
            if(taskIndex < 6)
                return I5cdebbe89ca57c7ff562d014[taskIndex];
        }
        if (processId == '5cdebbfb9ca57c7ff562d016') {
            uint[7] memory I5cdebbfb9ca57c7ff562d016 = [uint(0), 5, 6, 0, 0, 0, 5];
            if(taskIndex < 7)
                return I5cdebbfb9ca57c7ff562d016[taskIndex];
        }
        return 0;
    }
}