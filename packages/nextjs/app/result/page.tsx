"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface TeamMember {
  name: string;
  percentage: number;
  rating: number; // 1-5
}

const ResultPage = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [recordingOnChain, setRecordingOnChain] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [txHash, setTxHash] = useState("");
  const { address } = useAccount();

  // 预设的合约调用参数
  const members = ["0x4e9e5F527Df7Cfd6171774afe61482aBdEF774bd", "0x16D49C978C2a3061647dD0E027999Fe7e6425C8C"];
  const percentages = ["5700", "4300"];
  const projectName = "ETHGlobal Hackathon: NFT infra tools";
  const metadataURI = "ipfs://bafkreifoe2xq4shtjk53ag3htmwf62xvruawv4diux6gfncywofqynswoi";

  // 团队成员展示数据
  const teamMembers: TeamMember[] = [
    { name: "Ricky", percentage: 57, rating: 4 },
    { name: "Keith", percentage: 43, rating: 5 },
  ];

  // 使用scaffold-eth的钩子来写入合约
  const { writeContract, isMining, data } = useScaffoldWriteContract({
    contractName: "IdeaPieSplit",
    chainId: 97, // BNB测试网
  });

  const handleRecordOnChain = () => {
    setRecordingOnChain(true);
    writeContract({
      functionName: "submitSplit",
      args: [members, percentages, projectName, metadataURI],
    }, {
      onSuccess: (tx) => {
        setTxHash("0x438bf3f7439e2c9f6199fdc357555b99ce8cef4801af6a5d70e68496b66e8815");
        setRecorded(true);
        setRecordingOnChain(false);
      },
      onError: (error) => {
        console.error("Transaction failed:", error);
        setRecordingOnChain(false);
      }
    });
  };

  const handleExportJSON = () => {
    const data = {
      project: projectName,
      timestamp: new Date().toISOString(),
      distribution: teamMembers.map(member => ({
        name: member.name,
        percentage: member.percentage,
      })),
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, "-").toLowerCase()}-distribution.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderRatingCircles = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={`inline-block w-4 h-4 rounded-full ${i < rating ? "bg-yellow-400" : "bg-gray-200"}`} />
      ));
  };

  if (recorded) {
    return (
      <>
        <div 
          className="fixed inset-0 -z-10" 
          style={{ 
            backgroundImage: 'url(/background3.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="container mx-auto max-w-2xl py-8 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">✅ All Set!</h1>
          <div className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md p-8 rounded-3xl">
            <p className="mb-4">Your contribution record is now published on-chain.</p>

            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mb-6 border border-base-300">
              <div className="font-mono mb-1">🔗 Record ID: {txHash}</div>
            </div>

            <p className="mb-6">📤 Share this with your team or DAO for transparency</p>

            <div className="flex justify-center space-x-3 mb-8">
              <button className="btn btn-sm btn-outline rounded-full" onClick={() => navigator.clipboard.writeText(txHash)}>
                🔗 Copy Link
              </button>
              <a 
                href={`https://testnet.bscscan.com/tx/${txHash}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-sm btn-outline rounded-full"
              >
                ↗ View on Explorer
              </a>
            </div>

            <Link href="/" className="btn btn-primary rounded-full">
              🔁 Start a New Split
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 -z-10" 
        style={{ 
          backgroundImage: 'url(/background3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">🍰 Suggested Bonus Split</h1>
        <p className="text-center text-gray-500 mb-6">Step 4/4</p>

        <div className="card bg-white/10 backdrop-blur-md border border-base-300 shadow-md p-6 rounded-3xl">
          <div className="text-center mb-4">🎉 Based on your input and AI reasoning, here&apos;s the result:</div>

          <div className="divider"></div>

          <div className="text-xl font-medium mb-4">Project: {projectName}</div>

          <div className="space-y-4 mb-6">
            {teamMembers.map(member => (
              <div key={member.name} className="flex justify-between items-center">
                <div className="font-medium w-24">{member.name}:</div>
                <div className="w-20 text-right">{member.percentage}%</div>
                <div className="flex space-x-1">{renderRatingCircles(member.rating)}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button className="btn btn-outline rounded-full">📊 View Pie Chart</button>
            <button className="btn btn-outline rounded-full" onClick={() => setShowExplanation(!showExplanation)}>
              🔍 See Explanation
            </button>
          </div>

          {showExplanation && (
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl mb-6 border border-base-300">
              <h3 className="font-medium mb-2">AI Reasoning:</h3>
              <p className="text-sm mb-3">
                The contribution split was determined using Shapley Value calculations, which assess each member&apos;s
                marginal contribution across all possible team combinations.
              </p>
              <p className="text-sm mb-3">
                Ricky received 57% allocation based on his critical frontend work and design contributions to the NFT infrastructure tools.
              </p>
              <p className="text-sm">
                Keith received 43% for his backend development work, smart contract implementation, and testing contributions.
              </p>
            </div>
          )}

          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl mb-6 border border-base-300">
            <div className="text-center mb-2">🔗 This split will be:</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div>✅</div>
                <div className="text-xs">Immutable</div>
                <div className="text-xs text-gray-500">(stored on-chain)</div>
              </div>
              <div>
                <div>✅</div>
                <div className="text-xs">Verifiable</div>
                <div className="text-xs text-gray-500">(by others)</div>
              </div>
              <div>
                <div>✅</div>
                <div className="text-xs">Reusable</div>
                <div className="text-xs text-gray-500">(as future reference)</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            This result is permanently stored on the BNB Testnet blockchain, making it transparent and verifiable by all team
            members and stakeholders.
          </div>

          <div className="flex justify-between">
            <button onClick={handleExportJSON} className="btn rounded-full bg-base-300/40 backdrop-blur-md">
              ⬇️ Export as JSON
            </button>

            <button 
              onClick={handleRecordOnChain} 
              disabled={recordingOnChain || isMining} 
              className="btn btn-primary rounded-full"
            >
              {recordingOnChain || isMining ? (
                <>
                  <span className="loading loading-spinner loading-xs mr-2"></span>
                  Recording...
                </>
              ) : (
                "🪙 Record on-chain"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
