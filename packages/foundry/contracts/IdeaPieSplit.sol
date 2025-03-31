// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdeaPieSplit {
    struct Allocation {
        address[] members;
        uint256[] percentages; // Use basis points: 1% = 100
        string projectName;
        string metadataURI; // Optional: off-chain explanation or IPFS link
        uint256 timestamp;
    }

    uint256 public splitCounter = 0;
    mapping(uint256 => Allocation) public splits;
    mapping(bytes32 => uint256) public hashToSplitId;

    event SplitRecorded(
        uint256 indexed splitId,
        string projectName,
        address indexed submitter,
        uint256 timestamp
    );

    /// @notice Submit a finalized split to the chain (percentages use 10000 = 100%)
    function submitSplit(
        address[] calldata members,
        uint256[] calldata percentages,
        string calldata projectName,
        string calldata metadataURI
    ) external {
        require(members.length == percentages.length, "Mismatched input lengths");

        uint256 total = 0;
        for (uint i = 0; i < percentages.length; i++) {
            total += percentages[i];
        }
        require(total == 10000, "Total must be 100% (10000)");

        splits[splitCounter] = Allocation({
            members: members,
            percentages: percentages,
            projectName: projectName,
            metadataURI: metadataURI,
            timestamp: block.timestamp
        });

        // Optional: hash index for deduplication or traceability
        bytes32 contentHash = keccak256(abi.encode(members, percentages, projectName));
        hashToSplitId[contentHash] = splitCounter;

        emit SplitRecorded(splitCounter, projectName, msg.sender, block.timestamp);
        splitCounter++;
    }

    function getSplit(uint256 splitId) external view returns (Allocation memory) {
        return splits[splitId];
    }

    function getSplitByHash(bytes32 hash) external view returns (Allocation memory) {
        return splits[hashToSplitId[hash]];
    }
}
