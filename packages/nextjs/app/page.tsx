"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 max-w-4xl w-full">
        <h1 className="text-center">
          <span className="block text-4xl font-bold">🥧 IDEA PIE</span>
          <span className="block text-2xl mt-2">AI-Powered, Blockchain-Backed Fair Bonus Allocator</span>
        </h1>
        
        <div className="mt-8 text-center">
          <p className="text-lg">
            Empower your team to split rewards fairly — and
            verifiably — with the help of AI and blockchain.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button 
            onClick={() => router.push('/input-team')}
            className="btn btn-primary btn-lg">
            🔄 Start Splitting the Pie
          </button>
        </div>

        <div className="flex justify-center space-x-8 mt-6">
          <Link href="/how-it-works" className="link link-hover">
            → How It Works
          </Link>
          <Link href="/sample-result" className="link link-hover">
            → View Sample Result
          </Link>
        </div>

        <div className="flex justify-between items-center mt-12 border-t pt-8">
          <div className="flex items-center">
            <span className="mr-2">🧠</span>
            <span>Powered by AI</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🔗</span>
            <span>Secured on Blockchain</span>
          </div>
          <div>
            {!connectedAddress ? (
              <button className="btn btn-outline btn-sm">
                Connect Wallet
              </button>
            ) : (
              <div className="text-sm">
                Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
