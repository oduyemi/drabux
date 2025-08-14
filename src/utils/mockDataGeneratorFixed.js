// Mock data generator for live activity feed
export class MockDataGenerator {
    constructor() {
        this.firstNames = [
            "Michael",
            "Laura",
            "James",
            "Sophia",
            "Daniel",
            "Emily",
            "Oliver",
            "Ava",
            "William",
            "Isabella",
            "Noah",
            "Olivia",
            "Liam",
            "Emma",
            "Jacob",
            "Mia",
            "Benjamin",
            "Charlotte",
            "Mason",
            "Amelia",
            "Elijah",
            "Harper",
            "Alexander",
            "Grace",
            "Ethan",
            "Chloe",
            "Samuel",
            "Zoe",
            "David",
            "Victoria",
            "Joseph",
            "Stella",
            "Henry",
            "Luna",
            "Owen",
            "Bella",
            "Jack",
            "Aria",
            "Leo",
            "Penelope",
            "Gabriel",
            "Victoria",
            "Logan",
            "Evelyn",
            "Caleb",
            "Avery",
            "Wyatt",
            "Scarlett",
            "Jackson",
            "Mila",
            "Julian",
            "Layla",
            "Matthew",
            "Nora",
            "Carter",
            "Aubrey",
            "Eli",
            "Hannah",
            "Sebastian",
            "Eleanor",
        ];

        this.countries = {
            Italy: "🇮🇹",
            Germany: "🇩🇪",
            France: "🇫🇷",
            Spain: "🇪🇸",
            UK: "🇬🇧",
            Canada: "🇨🇦",
            Australia: "🇦🇺",
            Brazil: "🇧🇷",
            India: "🇮🇳",
            Nigeria: "🇳🇬",
            China: "🇨🇳",
            Japan: "🇯🇵",
            Mexico: "🇲🇽",
            "South Korea": "🇰🇷",
            Argentina: "🇦🇷",
            Egypt: "🇪🇬",
            Russia: "🇷🇺",
            Sweden: "🇸🇪",
            "South Africa": "🇿🇦",
            Thailand: "🇹🇭",
            Vietnam: "🇻🇳",
            Turkey: "🇹🇷",
        };

        this.goalTypes = [
            "Vehicle",
            "House",
            "Travel",
            "Education",
            "Retirement",
            "Investment",
            "Business",
            "Wedding",
            "Baby Fund",
            "Emergency Fund",
            "Vacation",
            "Health",
            "Home Renovation",
            "New Gadget",
            "Debt Repayment",
        ];

        this.rankNames = ["Associate Investor", "Principal Strategist", "Elite Capitalist", "Wealth Architect", "Finance Titan"];

        this.emojis = ["🚀", "💰", "✨", "📈", "🏆", "🎉", "💸", "✅", "🔥", "🤩"];
    }

    generateMaskedName(name) {
        if (name.length <= 2) return name;
        const numAsterisks = Math.floor(Math.random() * (name.length - 2)) + 1;
        const start = name[0];
        const end = name[name.length - 1];
        return `${start}${"*".repeat(numAsterisks)}${end}`;
    }

    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateEntry() {
        const fullName = this.getRandomItem(this.firstNames);
        const maskedName = this.generateMaskedName(fullName);

        const countryEntries = Object.entries(this.countries);
        const [countryName, countryFlag] = this.getRandomItem(countryEntries);

        const actionTypes = ["staking", "staking", "staking", "goal", "goal", "referral_bonus", "referral_bonus", "nxp", "nxp", "nlp", "rank_bonus"];
        const actionType = this.getRandomItem(actionTypes);

        let entry = "";
        let priority = "normal";

        switch (actionType) {
            case "goal": {
                const goalType = this.getRandomItem(this.goalTypes);
                const goalAmount = this.getRandomInt(20, 50000);
                entry = `${maskedName} from ${countryFlag} just created a ${goalType} goal of $${goalAmount.toLocaleString()}`;
                priority = goalAmount > 10000 ? "high" : "normal";
                break;
            }
            case "referral_bonus": {
                const level = this.getRandomInt(1, 5);
                const refAmount = this.getRandomInt(5, 200);
                entry = `${maskedName} from ${countryFlag} just earned a level ${level} referral bonus of $${refAmount}`;
                priority = level >= 4 ? "high" : "normal";
                break;
            }
            case "rank_bonus": {
                const rank = this.getRandomItem(this.rankNames);
                const rankAmount = this.getRandomInt(25, 500);
                entry = `${maskedName} from ${countryFlag} just received a ${rank} rank bonus of $${rankAmount}`;
                priority = "high";
                break;
            }
            case "nxp": {
                const nxpPoints = this.getRandomInt(50, 1000);
                entry = `${maskedName} from ${countryFlag} just earned ${nxpPoints} Novunt Experience Points (NXP) 🎉`;
                break;
            }
            case "nlp": {
                const nlpPoints = this.getRandomInt(10, 500);
                entry = `${maskedName} from ${countryFlag} just earned ${nlpPoints} Novunt Legacy Points (NLP) for staking`;
                break;
            }
            case "staking": {
                const stakeAmount = this.getRandomInt(10, 1000);
                entry = `${maskedName} from ${countryFlag} just staked $${stakeAmount} towards their goals 💸`;
                priority = stakeAmount > 500 ? "high" : "normal";
                break;
            }
            default:
                entry = `${maskedName} from ${countryFlag} is actively growing their wealth`;
        }

        entry += ` ${this.getRandomItem(this.emojis)}`;

        const now = new Date();
        const minutesAgo = this.getRandomInt(1, 180);
        const timestamp = new Date(now.getTime() - minutesAgo * 60 * 1000);

        return {
            id: Math.random().toString(36).substr(2, 9),
            message: entry,
            timestamp: timestamp,
            type: actionType,
            country: countryName,
            flag: countryFlag,
            user: maskedName,
            priority: priority,
            minutesAgo: minutesAgo,
        };
    }

    generateEntries(count = 100) {
        const entries = [];
        for (let i = 0; i < count; i++) {
            entries.push(this.generateEntry());
        }
        return entries.sort((a, b) => b.timestamp - a.timestamp);
    }
}

export const mockDataGenerator = new MockDataGenerator();
