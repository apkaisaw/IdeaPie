# 🥧 Idea Pie — Fair Bonus Splitting with AI & Blockchain

**Idea Pie** is an AI-powered, blockchain-backed tool that helps hackathon teams split their bonus fairly based on actual contributions.  
Using large language models + Shapley Value algorithm, it evaluates each member's task and generates a verifiable, on-chain record of the proposed split.

![Idea Pie Homepage](packages/nextjs/public/readme.png)

---

## 🔍 Problem

Most teams struggle with fair bonus allocation after a project is completed. Who did more? Who was critical? These questions can lead to tension and unfair outcomes.

---

## 💡 Solution

Idea Pie simplifies this process:
- Describe what each team member did
- (Optionally) Select a similar reference case
- Let the AI evaluate task contributions
- Get a transparent bonus allocation based on Shapley Value
- Record it on-chain, forever

---

## 🚀 Tech Stack

| Layer       | Stack                          |
|------------|---------------------------------|
| Frontend    | Next.js 14, Tailwind CSS        |
| AI Logic    | Prompt-based LLM (e.g. Qwen/GPT-4) |
| Blockchain  | Solidity (allocation record contract) |
| Storage     | IPFS (for metadata + explanation) |

---

## 📦 MVP Features

- [x] Contribution form: project + team info
- [x] Optional reference case selection
- [x] One-shot LLM call: scoring + Shapley allocation
- [x] Pie chart + reasoning view
- [x] On-chain submission via smart contract
- [x] IPFS metadata with AI explanations

---

## 🔗 Smart Contract (Solidity)

- Records member addresses, split percentages, project name, and IPFS metadata URI
- Public and immutable
- See `/contracts/IdeaPieSplit.sol`

---

## 📁 IPFS Metadata Format

```json
{
  "project": "zkID Platform",
  "members": {
    "0x...": {
      "name": "Alice",
      "score": 85,
      "share": 40.1,
      "explanation": "...",
      "marginal_value": "..."
    }
  },
  "reference_case_used": {
    "title": "...",
    "split": "...",
    "description": "..."
  },
  "shapley_summary": "...",
  "prompt_used": "...",
  "timestamp": "..."
}
```

---

## 🧠 Why Shapley Value?

Shapley Value is a Nobel-prize-winning method for fair division in cooperative game theory.  
It considers all possible combinations of team members to evaluate marginal contributions.

---

## 🪙 Why Blockchain?

- ✅ Immutable proof of contribution
- ✅ Transparent, verifiable, shareable
- ✅ Useful for future reference or contributor reputation

---

## 📌 Goals for This Hackathon

- Deliver a working MVP from input → AI → on-chain in one flow
- Support real use in hackathon teams
- Lay the foundation for future contributor reputation systems

---

## 📬 Contact

Built with ❤️ by [Keith]  
Want to use or build with Idea Pie? DM me or fork it!