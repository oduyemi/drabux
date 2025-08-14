Here are the real URL paths matched to their route components, based on your routing configuration in App.jsx:

Standalone routes:

/ → Home.jsx
/forgot-password → ForgotPassword.jsx
/new-password → NewPassword.jsx
/verification-success → VerificationSuccess.jsx
/edit-profile → EditProfile.jsx
/notification → Notification.jsx
/legacy-point → LegacyPoint.jsx
/ranking → Ranking.jsx
/not-found → NotFound.jsx

Nested under /app:

/app or /app/dashboard → DashboardPage.jsx
/app/transactions → Transactions.jsx
/app/invest → Deposit.jsx
/app/team → Team.jsx
/app/quest → gamify.jsx
/app/education → Education.jsx
/app/deposit → Deposit.jsx (Simple wallet funding)
/app/stake → Stake.jsx (Investment goals & staking wizard)
/app/withdraw-usdt → WithdrawUSDT.jsx
/app/confirm-withdrawal → WithdrawalConfirm.jsx
/app/investment-in-process → InvestmentProcessing.jsx
/app/confirm-deposit → DepositConfirm.jsx
/app/legacy-point → LegacyPoint.jsx
/app/deposit-process → DepositProcess.jsx
/app/edit-profile → EditProfile.jsx
/app/notification → Notification.jsx
/app/withdrawal-process → WithdrawalProcessing.jsx
/app/ranking → Ranking.jsx
/app/verification-success → VerificationSuccess.jsx
Each route component handles the page or feature described by its name.

Based on the workspace structure, the routes are located in the routes directory. Here are the routes present in the codebase, along with their likely functions (based on their filenames):

AuthLayout.jsx – Handles authentication-related layout, possibly wrapping sign-in, sign-up, and password reset pages.
Create.jsx – Likely for creating a new account or entity.
Deposit.jsx – Handles deposit functionality for users.
DepositConfirm.jsx – Confirms deposit actions, possibly a step after deposit initiation.
DepositProcess.jsx – Manages the process/steps of making a deposit.
EditProfile.jsx – Allows users to edit their profile information.
ForgotPassword.jsx – Handles password recovery for users.
gamify-NGSL-HO-0727.jsx – Likely a gamification feature or event-specific route.
gamify.jsx – General gamification features for user engagement.
Home.jsx – The main landing/dashboard page after login.
InvestmentProcessing.jsx – Manages investment processing steps.
layout.jsx – General layout for route pages, possibly a wrapper for nested routes.
LegacyPoint.jsx – Handles legacy points, possibly for rewards or loyalty.
NewPassword.jsx – Allows users to set a new password after verification.
Notification.jsx – Displays user notifications.
Ranking.jsx – Shows user or investment rankings.
ResetVerificationSuccess.jsx – Success page after password reset verification.
SignIn.jsx – User sign-in page.
VerificationSuccess.jsx – Success page after account or action verification.

