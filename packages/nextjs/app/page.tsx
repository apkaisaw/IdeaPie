"use client";

import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  return (
    <>
      <div 
        className="fixed inset-0 -z-10" 
        style={{ 
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="flex items-center justify-center py-4">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-3">
                <Image 
                  src="/title.png" 
                  alt="IDEA PIE" 
                  width={350} 
                  height={112} 
                  priority
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold w-full mx-auto bg-gradient-to-r from-[#FFFDD0] to-[#FAEBD7] bg-clip-text text-transparent drop-shadow-md" style={{ textShadow: "0px 2px 4px rgba(77, 59, 39, 0.2)" }}>
                AI-Powered, Blockchain-Backed Fair Bonus Allocator
              </h2>
            </div>
            
            <p className="text-2xl leading-relaxed max-w-xl mx-auto mb-4 font-semibold text-neutral" style={{ textShadow: "0px 1px 0px #FFFACD, 0px 2px 3px rgba(255, 250, 205, 0.7)" }}>
              Use this tool to divide hackathon <span className="text-neutral" style={{ textShadow: "0px 1px 0px #FFD700, 0px 2px 4px rgba(255, 215, 0, 0.8)" }}>prizes</span> fairly among your team members.
            </p>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-6 container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-4xl mx-auto">
            {[
              { icon: "🧠", title: "Analyze with AI Agent", style: { backgroundColor: "rgba(139, 69, 19, 0.75)", color: "#FFFFFF" } },
              { icon: "⚖️", title: "Rooted in Shapley Value", style: { backgroundColor: "rgba(191, 159, 127, 0.75)", color: "#4D3B27" } },
              { icon: "🔗", title: "Verifiable on-chain", style: { backgroundColor: "rgba(160, 196, 166, 0.75)", color: "#4D3B27" } }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" 
                  style={feature.style}>
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 mb-4">
            <button 
              onClick={() => router.push('/input-team')}
              className="btn btn-lg px-8 text-lg font-bold text-white hover:brightness-105 hover:scale-105 transition-all duration-200"
              style={{ 
                backgroundColor: "#E77E45", 
                borderColor: "#E77E45", 
                boxShadow: "0 4px 8px rgba(231, 126, 69, 0.4)",
              }}
            >
              🔄 Start Splitting the Pie
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
