DOC 1

NOVUNT Product Requirements Document (PRD)
1. Overview
1.1 Product Name: NOVUNT
1.2 Vision Statement:
NOVUNT is a goal-based staking platform that allows users to stake USDT towards specific financial goals and earn up to 200% of their stake. The platform integrates real-time earnings tracking, a multi-tier referral system, gamification, and blockchain-based rewards to maximize user engagement and financial growth.
1.3 Business Objectives:
✅ Provide a secure, transparent, and profitable staking platform.
 ✅ Implement goal-based staking for structured financial growth.
 ✅ Offer multi-tier referral incentives to drive network expansion.
 ✅ Reward users with Novunt Legacy Points (NLP) for blockchain airdrops.
 ✅ Introduce gamification (NXP & Leaderboards) to boost engagement.
 ✅ Ensure fast, secure USDT transactions via NowPayments API.
2. System Architecture
2.1 Tech Stack
Frontend: React (Next.js), TailwindCSS/Chakra UI
Backend: NestJS (Node.js), PostgreSQL (for transactions), Redis (for caching)
Authentication: JWT + 2FA (Google Authenticator)
Payments: NowPayments API for USDT deposits/withdrawals
2.2 Security Features
Multi-signature admin withdrawals to prevent unauthorized access.
Anti-fraud detection algorithms to monitor suspicious activity.
3. User Flow
3.1 Sign Up & Verification
User registers with email/phone and sets up 2FA authentication.
3.2 Staking System
Users deposit USDT into their platform wallet.
They manually stake towards a specific goal (e.g., "House Goal").
The system locks the stake and tracks earnings.
Weekly profits are added until the user reaches 200%.
3.3 Earnings & Weekly Trade Reports
Admin inputs daily trade profits.
Users earn weekly based on market performance.
24-hour cooldown before earnings start.
The live graph on the dashboard updates earnings progress.
3.4 Withdrawal & Reinvestment
✅ Minimum withdrawal: 20 USDT (in multiples of 5 USDT).
 ✅ 10% withdrawal fee applies.
 ✅ Users must stake before withdrawing referral bonuses.
 ✅ Users cannot withdraw deposited capital, only profits.
3.5 Transfer
✅ Users can transfer through their usernames 
✅ Transfer attracts a 0.5% fee of the transfer amount from the sender
✅ Protection of 2FA should be used to protect users from fraud when they initiate a transfer
4. Gamification & Rewards
4.1 Novunt Experience Points (NXP)
✅ Earned via:
Daily logins, weekly engagement tasks, & milestone tasks.
Social media follows, surveys, and challenges
Referral-based activity & staking consistency
✅ Conversion: 5 NXP = 1 NLP weekly 
✅ Used for: Unlocking bonuses, fee discounts, increased staking caps
4.2 Novunt Legacy Points (NLP)
✅ Earned via:
Deposits: 0.5 NLP per $1 staked
Referrals: 0.5 NLP per direct referral
NXP conversion (1 NXP = 0.5 NLP) 
✅ Multi-Level Referral Earnings: 10% reduction per level down to infinity 
✅ Use Case: Future blockchain airdrops
4.3 Staking Goals & Customization
✅ Users can create multiple goal-based staking plans (e.g., Car, House).
 ✅ Each goal earns independently towards its 200% cap.
 ✅ XP-based milestone perks increase earning potential.
4.4 Leaderboard & Achievement Badges
✅ Monthly leaderboard resets to encourage competition.
 ✅ Top users earn badges & perks based on:
Highest staking amount
Most referral earnings
Most NLP earned
Highest weekly engagement 
✅ Weekly XP leaderboard with rewards: 🥇 1st place: Cashback or XP boost
 🥈 2nd place: Mystery bonus (random XP or USDT reward)
 🥉 3rd place: Discount token for reduced withdrawal fees
5. Referral System & Rank Incentives
5.1 Multi-Level Referral Bonus Structure
✅ Referral Earnings (Distributed Across 5 Levels):
Level
Bonus %
1
5%
2
2%
3
1.5%
4
1%
5
0.5%
✅ Locked Bonuses: Referral earnings remain locked until the referred user stakes at least 10 USDT.


✅ Depleting Bonus System: If a referred user doesn’t stake within 14 days of registration, the bonus they have earned will start depleting by 1% daily. After 50 days, the bonus is fully depleted to Zero. ✅ They will get a 3-day notification before depletion activity commences. 



5.2 Rank-Based Rewards
✅ Ranks & Requirements:
Rank
Team Investment
Direct Downlines
Bonus Allocation
Associate Investor
$5,000
5
10% of Rank Pool
Principal Strategist
$10,000
10
12.5% of Rank Pool
Elite Capitalist
$25,000
15
15% of Rank Pool
Wealth Architect
$50,000
20
17.5% of Rank Pool
Finance Titan
$100,000
25
20% of the Rank Pool

6. Backend & Admin Panel Features
6.1 Admin Dashboard
✅ Set weekly profit percentages 
✅ Monitor staking, withdrawals, & liquidity 
✅ Track referral growth & leaderboard rankings 
✅ Adjust NXP/NLP conversion rates dynamically
6.2 Security & Fraud Prevention
✅ Two-Factor Authentication (2FA) for withdrawals & transfers ✅ Automated anti-fraud checks ✅ Multi-signature verification for large transactions
7. Roadmap & Deployment Plan
Phase
Development Tasks
Timeline
Phase 1
Core Backend & Authentication
Week 1-2
Phase 2
Staking & Referral Engine, NLP Conversion
Week 3-4
Phase 3
Gamification (XP, Leaderboard, NLP)
Week 5-6
Phase 4
Security & Final Testing
Week 7-8
Phase 5
Full Deployment & Marketing
Week 9-10


Conclusion
The Novunt PRD establishes a robust, secure, and scalable staking ecosystem, integrating goal-based financial growth, gamified engagement, and blockchain rewards. By following this PRD, we ensure a successful and engaging product launch.



DOC 2

Novunt Incentive Program Overview
Novunt is an innovative financial ecosystem designed to revolutionize profit-sharing and reward distribution within the financial market space. Built upon the pillars of fairness, sustainability, and strategic scalability, the Novunt Incentive Program ensures equitable rewards for every participant while simultaneously protecting the platform’s long-term profitability.
This document outlines the mechanics of the Redistribution Pool, the Direct Referral Bonus System, and the Ranking Bonus Structure—each aligned with Novunt’s core philosophy of progressive wealth empowerment.
Novunt Vision for Incentives
The Novunt incentive framework is intentionally designed to:
Recognize Commitment: Reward active participants and those dedicated to building thriving teams.
Fuel Platform Growth: Motivate staking and strategic involvement that drive collective success.
Support Long-Term Viability: Maintain a scalable reward model that protects profitability while fairly compensating contributors.
Preserve Fairness: Eliminate rank-based disincentives by addressing performance overlap among team members.
Empower Team Development: Encourage users to expand and nurture active downlines.
Balance Rewards with Sustainability: Introduce capped pools to maintain harmony between growth and incentives.


Direct Referral Bonuses
Novunt fosters expansion through a refined, multi-level referral structure that rewards stakers for onboarding new participants. This system promotes organic network growth and deep team engagement.
Referral Bonus Distribution Structure:
Level 1: 5%
Level 2: 2%
Level 3: 1.5%
Level 4: 1%
Level 5: 0.5%


Total Referral Bonus: 10% of the referred stake amount, distributed once across five generational tiers. This model ensures that both breadth and depth in team-building are rewarded.
Ranking Bonus and Redistribution Pool System
Profit Allocation Structure (Sample $500,000 Weekly Profit)
90% ($450,000) → Shared among all active stakers
7.5% ($37,500) → Directed to the Ranking Bonus Pool
2.5% ($12,500) → Allocated to the Redistribution Pool


Pool Distribution by Rank for Ranking Bonus and Redistribution Bonus
Associate Stakeholder: 15%
Principal Strategist: 17.5%
Elite Capitalist: 20%
Wealth Architect: 22.5%
Finance Titan: 25%
Ranking Pool: Core Distribution Strategy
The ranking system motivates stakeholders to cultivate active, high-performing teams. Each week, 7.5% of declared profits is allocated to the Rank Bonus Pool, which is then shared among qualified rankers based on predefined criteria.
Ranks, Requirements, and Bonus Allocation:
Associate Staker
Team Active Stake: $5,000
Personal Active Stake $50
Direct Downlines: 5
Other Requirement: None
Rank Bonus: 15% of the Rank Bonus Pool
Redistribution: 15% of the redistribution Pool


Principal Strategist
Team Active Stake: $10,000
Personal Active Stake: $100
Direct Downlines: 10
Other Requirement: 2 Associate Stakeholders
Rank Bonus: 17.5% of the Rank Bonus Pool
Redistribution: 17.5% of the redistribution Pool


Elite Capitalist
Team Active Stake: $25,000
Personal Active Stake: $250
Direct Downlines: 15
Other Requirement: 2 Principal Strategists
Rank Bonus: 20% of the Rank Bonus Pool
Redistribution: 20% of the redistribution Pool


Wealth Architect
Team Active Stake: $50,000
Personal Active Stake: $500
Direct Downlines: 20
Other Requirement: 2 Elite Capitalists
Rank Bonus: 22.5% of the Rank Bonus Pool
Redistribution: 22.5% of the redistribution Pool


Finance Titan
Team Active Stake: $100,000
Personal Active Stake: $1000
Direct Downlines: 25
Other Requirement: 2 Wealth Architects
Rank Bonus: 25% of the Rank Bonus Pool
Redistribution: 25% of the redistribution Pool


Redistribution Pool: Core Distribution Strategy
To prevent temporary setbacks when team members reach parity in rank, Novunt has developed a modern Redistribution Pool, which allocates 2.5% of declared profits. This ensures continuous reward flow and leadership motivation during transition phases.


Redistribution Eligibility Criteria
A stakeholder qualifies for redistribution if:
Their direct or indirect invitee achieves the same rank,
And the original staker has not yet met the requirements to ascend further.


This buffer ensures high performers aren’t penalized for developing strong teams.
Step-by-Step Distribution Methodology of the Ranking and Redistribution Pool
To maintain clarity and fairness, Novunt follows a streamlined weekly distribution flow:
Step 1: Profit Declaration
The platform announces its weekly distributable profit (e.g., 5%).
Step 2: Structured Allocation
90% → All active stakers
7.5% → Rank Bonus Pool
2.5% → Redistribution Pool


Step 3: Rank-Based Percentage Split
Both pools are split using the following breakdown:
Associate Staker: 15%
Principal Strategist: 17.5%
Elite Capitalist: 20%
Wealth Architect: 22.5%
Finance Titan: 25%
Accurate Percentage Calculations(Using $500,000 sample calculation):
Let’s derive the true percentages from these figures:

Pool
Amount
Percentage of $500,000
Active Stakers
$450,000
    90%
Ranking Bonus Pool
$37,500
    7.5%
Redistribution Pool
$12,500
    2.5%
Total Profit Distributed
$500,000
    100%

Sample calculation “Pool Allocations by Rank and Redistribution”
$37,500 Rank Bonus Pool:

Rank: Associate Staker
Share: 15% per pool
Amount: $5,625
Participants: 250
Share per Participant: $22.5

Rank: Principal Strategist
Share: 17.5% per pool
Amount: $6,562.5
Participants: 200
Share per Participant: $32.8

Rank: Elite Capitalist
Share: 20% per pool
Amount: $7,500
Participants: 150
Share per Participant: $50

Rank: Wealth Architect
Share: 22.5% per pool
Amount: $8,437.5
Participants: 100
Share per Participant: $84.30

Rank: Finance Titan
Share: 25% per pool
Amount: $9,375
Participants: 50
Share per Participant: $187.50

$12,500 Redistribution Pool:
Rank: Associate Staker
Share: 15% per pool
Amount: $1,875
Participants: 250
Share per Participant: $7.5

Rank: Principal Strategist
Share: 17.5% per pool
Amount: $2,187.50
Participants: 200
Share per Participant: $10.93

Rank: Elite Capitalist
Share: 20% per pool
Amount: $2,500
Participants: 150
Share per Participant: $16.67


Rank: Wealth Architect
Share: 22.5% per pool
Amount: $2,812.5
Participants: 100
Share per Participant: $28.13

Rank: Finance Titan
Share: 25% per pool
Amount: $3,125
Participants: 50
Share per Participant: $62.5

Step 5: Identify Eligible Participants
Rank Bonus: All stakers who meet their rank’s criteria.
Redistribution: Rankers whose invitees have reached the same rank while the ranker remains in transition.


Step 6: Equal Distribution
Each rank’s pool allocation is equally divided among qualified stakers in that rank.
Step 8: Dynamic Monitoring
Regular audits ensure:
Fairness
Rank tracking accuracy
Real-time pool eligibility updates

Referral Bonus Activation Requirement
To receive referral bonuses, users must maintain an active staking goal of at least $10 USDT. This ensures referral benefits are reserved for participants who contribute to the Novunt ecosystem’s stability and growth.
Failure to meet this requirement triggers the following policy:

30-Day Grace Period: After a referral bonus is earned, the referrer has 30 days to activate a staking goal.
Reminder on Day 27: A notification email is sent with the subject: “⚠️ 3 Days Left Before Referral Bonus Depletion.”
Depletion on Day 28: If no goal is active by the end of the grace period, the referral bonus depletes by 1% daily until fully erased.
⚠️ Depletion is irreversible once initiated. Reactivating a goal after depletion begins will not restore lost rewards.
Restake & Bonus Continuity
Every restake by a staker generates fresh referral bonuses, following the same 5-level model:
Level 1: 5%
Level 2: 2%
Level 3: 1.5%
Level 4: 1%
Level 5: 0.5%


Restaked amounts also contribute toward the referring user's team investment.
Key Takeaways
Novunt’s incentive ecosystem is designed to:
Promote Equity: Fair and transparent profit redistribution


Encourage Long-Term Participation: Incentivize sustained team growth


Support Platform Longevity: Balance incentives with profitability


Scale Responsibly: Introduce caps and redistribution logic to sustain growth


By integrating its refined ranking and redistribution mechanics, Novunt positions itself as a pioneering force in sustainable wealth-building systems.



DOC 3

Novunt Incentive Program Overview
Novunt is an innovative financial platform committed to redefining profit-sharing and reward distribution in the investment ecosystem. The incentive program is built on fairness, sustainability, and strategic growth principles, ensuring equitable benefits for all participants while safeguarding the platform’s profitability.
This document details the redistribution pool distribution methodology, direct referral structure, and ranking bonus system, highlighting how each aligns with Novunt’s long-term objectives.

Novunt Vision for Incentives
Novunt incentives are structured to achieve the following:
Reward Commitment: Recognize active participation and team-building efforts.
Foster Growth: Incentivize investments that drive platform success.
Sustain Longevity: Create a scalable reward system that ensures profitability while fairly compensating contributors.
Ensure Fairness: Address structural challenges that rankers face when their downlines achieve equivalent ranks.
Motivate Team Building: Incentivize users to recruit and support active downlines.
Maintain Longevity: Balance reward distribution and profitability through capped incentive pools.

Direct Referral Bonuses
Novunt incentivizes network expansion through a dynamic, multi-tiered referral architecture. This structure rewards stakers who introduce new participants into the system, encouraging organic team growth and long-term engagement.
Referral Bonus Distribution Structure:
- Level 1: 5%
- Level 2: 2%
- Level 3: 1.5%
- Level 4: 1%
- Level 5: 0.5%
Total Referral Bonus: 10% of the referred stake amount, disbursed as a one-time reward across five generational tiers. This design ensures that both breadth and depth of referrals are incentivized, fueling the ecosystem with continuous momentum.

Ranking Bonus System
The ranking bonus system motivates users to build strong, active teams and rewards them based on their team’s overall performance. A 10% cap of weekly declared profit is allocated to the Rank Bonus Pool, which is then distributed among eligible rankers.
Ranks, Requirements, and Bonus Distribution:
Associate Investor
Team Investment: $5,000
Direct Downlines: 5
Rank Bonus: 15% of the Rank Bonus Pool
Principal Strategist
Team Investment: $10,000
Direct Downlines: 10
Lower Rank Requirement: 2 Associate Investors in the team
Rank Bonus: 17.5% of the Rank Bonus Pool
Elite Capitalist
Team Investment: $25,000
Direct Downlines: 15
Lower Rank Requirement: 2 Principal Strategists in the team
Rank Bonus: 20% of the Rank Bonus Pool
Wealth Architect
Team Investment: $50,000
Direct Downlines: 20
Lower Rank Requirement: 2 Elite Capitalists in the team
Rank Bonus: 22.5% of the Rank Bonus Pool
Finance Titan
Team Investment: $100,000
Direct Downlines: 25
Lower Rank Requirement: 2 Wealth Architects in the team
Rank Bonus: 25% of the Rank Bonus Pool

Redistribution Pool: Core Distribution Strategy
To address temporary incentive losses and ensure continuous motivation for participants, Novunt has established a Redistribution Pool. This pool is funded with 2.5% of the weekly profit, specifically reserved to compensate rankers who experience temporary losses in their bonuses when downlines achieve equivalent or higher ranks.

Key Objectives of the Redistribution Pool:
Equity Assurance: Ensure rankers maintain fair compensation even during rank progression transitions.
Team Growth Support: Encourage leaders to develop successful teams without fearing significant earnings loss.
Platform Sustainability: Maintain a balanced incentive 
Addressing Lost Incentives
When rankers experience temporary losses in ranking bonuses due to downlines achieving equivalent ranks, the Redistribution Pool ensures fairness. A percentage of the pool compensates affected rankers proportionately to their contributions and rank positions.
Redistribution Pool Benefits:
Rank Progression Support: Mitigates disincentives for developing strong teams.
Continuous Motivation: Encourages ongoing team-building efforts.
Fair Compensation: Prevents significant financial loss for rankers during structural transitions.

Step-by-Step Distribution Methodology of the Redistribution Pool
Step 1: Define Rank Weights and Points
We begin by defining the predefined weights for each rank, which will serve two purposes:
Redistribution Pool Calculation: The weights will determine the share of the Redistribution Pool allocated to each rank.
Points Allocation by Rank Calculation: These weights will also be used to calculate the points for each rank based on an individual’s achievements or contributions.


3. Direct Referral Bonuses
Novunt incentivizes network expansion through a dynamic, multi-tiered referral architecture. This structure rewards stakers who introduce new participants into the system, encouraging organic team growth and long-term engagement.
Referral Bonus Distribution Structure:
- Level 1: 5%
- Level 2: 2%
- Level 3: 1.5%
- Level 4: 1%
- Level 5: 0.5%
Total Referral Bonus: 10% of the referred stake amount, disbursed as a one-time reward across five generational tiers. This design ensures that both breadth and depth of referrals are incentivized, fueling the ecosystem with continuous momentum.
5. Redistribution Pool: Core Distribution Strategy
Novunt has reimagined redistribution through a modern, transparent structure that ensures no staker is left behind due to team progressions. This mechanism safeguards rankers from incentive losses when their team members attain equal standing, by introducing a dedicated Redistribution Pool.
Each week, Novunt declares a percentage of distributable profit (e.g., 5%). From this declared profit, three core allocations are made:
- 80% – Shared among all stakers with active staking goals.
- 15% – Allocated to the Ranking Bonus Pool.
- 5% – Allocated to the Redistribution Pool.
Example (based on a sample $500,000 declared profit):
- $400,000 → Shared with active stakers
- $75,000 → Ranking Bonus Pool
- $25,000 → Redistribution Pool
Both the Ranking Bonus Pool and Redistribution Pool are split among ranks using this structure:
- Associate Investor – 15%
- Principal Strategist – 17.5%
- Elite Capitalist – 20%
- Wealth Architect – 22.5%
- Finance Titan – 25%
Qualification for the Redistribution Pool:
A staker qualifies for the Redistribution Pool when:
- Their direct or indirect invitee attains the same rank as them.
- They have not yet met the full requirements to ascend to the next rank.
7. Step-by-Step Distribution Methodology of the Redistribution Pool
To uphold simplicity and fairness, Novunt’s weekly distribution strategy follows a rank-based methodology—void of complex weightings or calculations. Here’s how distribution unfolds every week:
Step 1: Declare Weekly Profit
Novunt announces the week’s distributable profit (e.g., 5% of total platform performance).
Step 2: Split the Declared Profit
- 80% → All stakers with active goals
- 15% → Rank Bonus Pool
- 5% → Redistribution Pool
Step 3: Apply Rank Distribution Percentages
- Associate Investor – 15%
- Principal Strategist – 17.5%
- Elite Capitalist – 20%
- Wealth Architect – 22.5%
- Finance Titan – 25%
Step 4: Calculate Pool Allocations by Rank
Example (Using $75,000 and $25,000 Pools):
Associate Investor – $11,250 (Rank Bonus), $3,750 (Redistribution)
Principal Strategist – $13,125 (Rank Bonus), $4,375 (Redistribution)
Elite Capitalist – $15,000 (Rank Bonus), $5,000 (Redistribution)
Wealth Architect – $16,875 (Rank Bonus), $5,625 (Redistribution)
Finance Titan – $18,750 (Rank Bonus), $6,250 (Redistribution)
Step 5: Identify Eligible Stakers
- Rank Bonus Pool: All stakers who meet their rank’s criteria.
- Redistribution Pool: Only stakers whose invitees have reached equal rank and who are awaiting promotion.
Step 6: Split Rank Allocations Among Qualified Members
Each rank’s pool share is equally distributed among all eligible members in that rank.
Step 7: Automate Weekly Distribution
Distributions are handled automatically via smart contract logic or internal platform systems.
Step 8: Monitor & Update
Ongoing system audits track evolving rank metrics, redistribution pool eligibility, and participation growth per tier.



Earnings Cap and Referral Adjustments
When an investor reaches the earnings cap of their investment, their initial deposit will be deducted from the total team investment attributed to their direct or indirect referral. For example, if an investor deposits $1,000 and, through weekly profit sharing, earns a total of $2,000 (representing their cap), the original $1,000 deposit will be subtracted from their referral's total team investment. If the referral's total team investment previously stood at $59,213, it will be adjusted to $58,213 once the investor's cap is reached.
Reinvestment and Referral Bonuses
Every reinvestment by an investor generates a referral bonus for their direct referral, cascading up to five levels deep across the referral network. Referral bonuses are distributed as follows:
Direct referral: 5%
Level 2: 2%
Level 3: 1.5%
Level 4: 1%
Level 5: 0.5%
Additionally, any reinvestment by an investor will count towards the total team investment attributed to their referral.

Key Takeaways
The Novunt incentive system is built to:
Promote Equity: Redistribute profits fairly to ensure consistent motivation.
Encourage Participation: Reward users for both short-term recruitment and long-term team development.
Drive Platform Success: Align incentives with sustainable financial growth.
Ensure Scalability: Maintain operational efficiency through caps on profit distribution.
By integrating the Redistribution Pool into its incentive structure, Novunt reinforces its commitment to fairness, growth, and sustainability for all participants.



DOC 4

🚀 Finalized Novunt Landing Page Prompt 🔥🔥
💡 Goal:
Create a visually stunning, highly persuasive, and luxury-driven landing page for Novunt that captures stakeholders, high-net-worth individuals, entrepreneurs, and everyday users looking to stake, earn, and dominate their financial future.

💡 Vibe & Aesthetic:
🎨 Color Palette: Deep Royal Blue Gradient (#000098 → #0000FE, Radial Gradient).
🔥 Luxury, Power & Trust – Gold accents, smooth animations, and premium branding.
⚡ Majestic Hero Section – First impression = instant attraction + exclusivity.
🎯 Psychological Triggers – Scarcity, Urgency, Prestige, and Social Proof to drive sign-ups.

🔹 Hero Section – First Impression That Commands Action
💡 Headline:
🚀 "Stake Today. Earn 200%. Secure Your Legacy."

💡 Subheadline:
Novunt is your gateway to long-term financial growth with goal-based staking, real-time rewards, and elite-tier incentives.
✔ Stake & Earn 200% on Your Goals.
✔ Get a 10% Bonus on Your First Deposit – But Only If You Stake Within 7 Days!
✔ Stake Anytime, Earn Anytime – No Limits, No Restrictions.
✔ "No Limits to Value, Net Worth, and Growth.

✔ Animated Transition:
🎥 As users scroll, the words "Value," "Net Worth," and "Growth" should elegantly animate, reinforcing Novunt’s limitless potential.

💡 Visual:
🔥 Cinematic Background Video or 3D Animation showing:

A glowing financial vault unlocking (symbolizing exclusive wealth access).
A countdown timer dynamically set to 7 days per user after registration (psychological urgency).
A digital “goal meter” filling up towards 200% staking profits.
💡 Call-to-Action (CTA) (Bold & Urgent):
👉 "Get Your 10% Bonus – Stake Within 7 Days of Joining!"
✔ [Claim Your Bonus & Start Staking] (Golden button → Signup page).
✔ [See How It Works] (For hesitant users → Explainer section).

🔥 Bonus Trigger (Personalized Countdown for Each User)
📌 As soon as a user registers, a countdown timer appears on their dashboard:

“Your 10% Bonus Expires In: 6 Days 23 Hours 59 Minutes”
“Don’t Miss This Exclusive Offer – Stake Now!”
🔹 Features That Make Novunt Unstoppable
🔥 1. Real-Time Market Earnings Update
✅ Stake & Track Your Growth in Real-Time.
✅ Profits Adjusted Daily Based on Market Performance.
✅ A Dynamic Graph on Your Dashboard Displays Your Earnings Growth.
✅ No Fixed Weekly Percentage – Your Returns Reflect Real Trading Profits.
✅ Earnings Begin After a 24-Hour Cooldown After Staking.

💡 Visual:
✔ Live Trading Graph that dynamically updates based on Novunt’s market activity.
✔ A slider allowing users to project their earnings over time.

💡 CTA:
🎯 "Stake. Watch. Earn – Track Your Profits Live!"

🎮 2. Gamification – Novunt Experience Points (NXP)
✅ Earn XP from:

Daily logins.
Weekly engagement tasks (social media follows, surveys, special activities).
Completing special challenges (XP boost packs, high-value tasks).
✅ Convert XP into Novunt Legacy Points (NLP) at a rate of 1 XP = 0.5 NLP weekly.
✅ NXP follows the same infinite referral structure as deposits & staking.
✅ The More Active You Are, The More NXP You Earn, The More NLP You Accumulate.
💡 Visual:
✔ A digital XP meter filling up as users engage in Novunt activities.
✔ Confetti animation whenever XP milestones are reached.

💡 CTA:
🔥 "Earn. Level Up. Unlock Bigger Rewards!"

🌐 3. Blockchain-Powered – Novunt Legacy Points (NLP)
✅ NLP is your gateway to the upcoming Novunt blockchain airdrop.
✅ Earn NLP through:

Staking (0.5 NLP per $1 staked).
Referrals (0.5 NLP per direct referral).
XP Conversions.
✅ Infinite-Level Deep Referral Reductions (10% Less Per Level).
💡 Visual:
✔ A futuristic blockchain vault animation with NLP flowing into a user’s digital wallet.

💡 CTA:
🔹 "Secure Your Spot in the Future of Blockchain Wealth!"

🤝 4. Multi-Level Referral Bonus System
✅ Earn up to 8% in referral commissions across 5 levels:

Level	Bonus %
1	3%
2	2%
3	1.5%
4	1%
5	0.5%
✅ Referral Bonuses Are LOCKED Until Users Stake at Least 10 USDT.
✅ Bonuses Start Depleting by 1% Daily After 14 Days of Inactivity.
✅ Unclaimed Bonuses Are Fully Depleted After 50 Days.

💡 CTA:
🔥 "Refer. Earn. Multiply. Unlock More Rewards!"

🏆 5. Ranking System – Unlock Higher Earnings
✅ Higher Ranks = Bigger Bonuses & Exclusive Perks.
✅ Bonuses Are Pulled From a 10% Weekly Declared Profit Pool.

Rank	Stake Requirement	Direct Downlines	Bonus Allocation
Associate Investor	$5,000	5	10% of Bonus Pool
Principal Strategist	$10,000	10	12.5% of Bonus Pool
Elite Capitalist	$25,000	15	15% of Bonus Pool
Wealth Architect	$50,000	20	17.5% of Bonus Pool
Finance Titan	$100,000	25	20% of Bonus Pool
💡 CTA:
🏅 "Climb the Ranks – Stake More, Earn More!"

📊 6. Customizable Staking Goals
✅ Users Can Create Unlimited Staking Goals (House, Car, Travel).
✅ Each Goal Has Its Own Independent 200% Cap.
✅ XP Milestones Unlock Higher Caps & Special Perks.

💡 CTA:
🔥 "Stake Towards Your Dream Goal – Earn 200%!"

🌟 7. Leaderboard & Achievement Badges
✅ Monthly Leaderboard Resets – Compete to Be the Top Staker!
✅ Earn Achievement Badges for Major Milestones.

🏆 Leaderboard Rewards:
🥇 1st Place → Cashback Bonus or XP Boost.
🥈 2nd Place → Mystery Bonus (XP Boost or Small USDT Reward).
🥉 3rd Place → Discount Token for Reduced Withdrawal Fees.

💡 CTA:
🔥 "Be the Best. Win Big. Own the Leaderboard!"

🔹 Final CTA – "Are You Ready to Secure Your Financial Future?"
🚀 "Stake Today & Get a 10% Bonus – Only for the Next 7 Days After You Register!"
✔ Transparent Earnings.
✔ Elite-Level Rewards.
✔ Blockchain-Backed Wealth Growth.

✅ [Sign Up & Claim Your Bonus] (Golden CTA Button).
✅ [Learn More] (Subtle CTA for hesitant users).



DOC 5

# 🚀 Novunt Frontend Enhancement Roadmap

## ✅ Phase 1 Complete: Foundation & Core Components
- ✅ Design system with comprehensive Tailwind config
- ✅ UI component library (Button, Card, Input, Badge, LoadingSkeleton)
- ✅ Error boundaries and loading states
- ✅ Accessibility improvements
- ✅ Enhanced Dashboard, Home, SignIn pages
- ✅ Professional Header/Sidebar components

## 🎯 Phase 2: Advanced Features & Business Logic

### Priority 1: Staking Features (Week 1)
- [ ] Goal-based staking interface
- [ ] Stake creation wizard with progress indicators
- [ ] Real-time earnings tracker
- [ ] Staking goals management dashboard
- [ ] Progress visualization with charts

### Priority 2: Gamification (Week 1-2)  
- [ ] NXP (Novunt Experience Points) system UI
- [ ] NLP (Novunt Legacy Points) dashboard
- [ ] Achievement badges display
- [ ] Leaderboard component with rankings
- [ ] Daily quest interface

### Priority 3: Referral System (Week 2)
- [ ] Multi-level referral tree visualization
- [ ] Referral bonus tracker
- [ ] Team performance dashboard
- [ ] Rank progression interface
- [ ] Bonus depletion warnings

### Priority 4: Advanced UX (Week 2-3)
- [ ] Progressive Web App (PWA) setup
- [ ] Micro-animations with Framer Motion
- [ ] Advanced charts with recharts
- [ ] Real-time notifications
- [ ] Dark/light theme toggle

### Priority 5: Security & Trust (Week 3)
- [ ] 2FA setup interface
- [ ] Security dashboard
- [ ] Transaction verification flows
- [ ] Fraud prevention indicators
- [ ] Audit trail visualization

### Priority 6: Performance & Polish (Week 3-4)
- [ ] Image optimization pipeline
- [ ] Code splitting implementation
- [ ] Advanced caching strategies
- [ ] Performance monitoring
- [ ] Final accessibility audit

## 🎨 Design Enhancements
- [ ] Advanced typography hierarchy
- [ ] Sophisticated color psychology
- [ ] Premium interaction patterns
- [ ] Professional data visualization
- [ ] Mobile-first responsive design

## 📊 Business Intelligence
- [ ] Comprehensive analytics dashboard
- [ ] User behavior tracking
- [ ] Performance metrics visualization
- [ ] ROI calculators
- [ ] Goal achievement tracking

## 🔄 Next Steps
1. Run `npm run dev` to see current improvements
2. Test the enhanced Dashboard and SignIn flows  
3. Ready to implement staking interface
4. Begin gamification features
5. Add referral system visualization

**Current Status**: Foundation complete, ready for advanced features! 🚀


Primary Colors
Blue Gradient: from-[#0a2c5e] to to-[#0e4b8c]
Accent Blue: #0e4b8c
Gold
White: #fff
Black: #000
Additional Colors
Gray: Used for backgrounds, borders, and text (Tailwind gray-100, gray-200, etc.)
Green: For success states (Tailwind green-500, green-600)
Red: For error states (Tailwind red-500, red-600)
Yellow: For warnings (Tailwind yellow-400, yellow-500)
Indigo: Sometimes used for highlights (indigo-500)
Dark Mode
Uses Tailwind’s dark: variants for backgrounds and text, typically switching to darker blues and grays.