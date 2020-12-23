const {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
} = require("./script.js");

const corn = {
    name: "corn",
    yield: 30,
    costs: 1,
    revenue: 3,

    factors: {
        sun: {
            low: -50,
            medium: 0,
            high: 50,
        },
        wind: {
            low: 10,
            medium: 50,
            high: 100,
        },
    },
};

const pumpkin = {
    name: "pumpkin",
    yield: 4,
    costs: 2,
    revenue: 5,

    factors: {
        sun: {
            low: -20,
            medium: 100,
            high: 30,
        },
        wind: {
            low: 50,
            medium: -10,
            high: -30,
        },
    },
};

describe("getYieldForPlant", () => {
    test(" Get yield  for plant without influencing Factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe(" Get Yield For Plant with influencing Factors", () => {
    test("corn, sun:low", () => {
        const influencingFactors = {
            sun: "low",
        };

        expect(getYieldForPlant(corn, influencingFactors)).toBe(15);
    });

    test("corn, sun:high", () => {
        const influencingFactors = {
            sun: "high",
        };

        expect(getYieldForPlant(corn, influencingFactors)).toBe(45);
    });

    test("pumpkin, sun:medium, wind: low", () => {
        const influencingFactors = {
            sun: "medium",
            wind: "low",
        };

        expect(getYieldForPlant(pumpkin, influencingFactors)).toBe(12);
    });

    test("pumpkin, sun:high, wind: low", () => {
        const influencingFactors = {
            sun: "high",
            wind: "low",
        };

        expect(getYieldForPlant(pumpkin, influencingFactors)).toBe(
            7.800000000000001
        );
    });

    test("pumpkin, sun:low, wind: high", () => {
        const influencingFactors = {
            sun: "low",
            wind: "high",
        };

        expect(getYieldForPlant(pumpkin, influencingFactors)).toBe(
            2.2399999999999998
        );
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const input = {
            crop: corn,
            num_crops: 10,
        };
        expect(getYieldForCrop(input)).toBe(300);
    });
});

describe("getYieldForCrop with influencing Factors", () => {
    test("corn, sun:low, wind: high", () => {
        const input = {
            crop: corn,
            num_crops: 10,
        };
        const influencingFactors = {
            sun: "low",
            wind: "high",
        };
        expect(getYieldForCrop(input, influencingFactors)).toBe(300);
    });

    test("pumpkin, sun:high", () => {
        const input = {
            crop: pumpkin,
            num_crops: 30,
        };
        const influencingFactors = {
            sun: "high",
        };
        expect(getYieldForCrop(input, influencingFactors)).toBe(156);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield  with multiple crops", () => {
        const crops = [
            { crop: corn, num_crops: 5 },
            { crop: pumpkin, num_crops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(158);
    });

    test("Calculate total yield with 0 amount", () => {
        const crops = [{ crop: corn, num_crops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test(" Get costs for crop corn", () => {
        const input = {
            crop: corn,
            num_crops: 50,
        };
        expect(getCostsForCrop(input)).toBe(50);
    });

    test("Get costs for crop pumpkin", () => {
        const input = {
            crop: pumpkin,
            num_crops: 50,
        };
        expect(getCostsForCrop(input)).toBe(100);
    });
});

describe("getRevenueForCrop", () => {
    test("Get revenue for crop Corn", () => {
        const input = {
            crop: corn,
            num_crops: 10,
        };
        expect(getRevenueForCrop(input)).toBe(900);
    });

    test("Get revenue for crop Pumpkin", () => {
        const input = {
            crop: pumpkin,
            num_crops: 25,
        };
        expect(getRevenueForCrop(input)).toBe(500);
    });
});

describe("getProfitForCrop", () => {
    test("Get profit for crop Corn", () => {
        const input = {
            crop: corn,
            num_crops: 50,
        };
        expect(getProfitForCrop(input)).toBe(4450);
    });

    test("Get profit for crop Pumpkin", () => {
        const input = {
            crop: pumpkin,
            num_crops: 100,
        };
        expect(getProfitForCrop(input)).toBe(1800);
    });
});

describe("getProfitForCrop with environment factors", () => {
    test("Corn, sun,wind: medium", () => {
        const input = {
            crop: corn,
            num_crops: 100,
        };

        const influencingFactors = {
            sun: "medium",
            wind: "medium",
        };

        expect(getProfitForCrop(input, influencingFactors)).toBe(13400);
    });

    test("Get profit for crop Pumpkin", () => {
        const input = {
            crop: pumpkin,
            num_crops: 50,
        };
        expect(getProfitForCrop(input)).toBe(900);
    });
});

describe("getTotalProfit", () => {
    test(" Get total profit situation 1", () => {
        const crops = [
            { crop: corn, num_crops: 500 },
            { crop: pumpkin, num_crops: 250 },
        ];

        expect(getTotalProfit({ crops })).toBe(49000);
    });

    test("Get total profit situation 2", () => {
        const crops = [
            { crop: corn, num_crops: 100 },
            { crop: pumpkin, num_crops: 50 },
        ];

        expect(getTotalProfit({ crops })).toBe(9800);
    });
});

describe("getTotalProfit with influencing factors", () => {
    test("sun: high, wind: high", () => {
        const crops = [
            { crop: corn, num_crops: 500 },
            { crop: pumpkin, num_crops: 250 },
        ];

        const influencingFactors = {
            sun: "high",
            wind: "high",
        };

        expect(getTotalProfit({ crops }, influencingFactors)).toBe(138550);
    });

    test("sun: high, wind: med", () => {
        const crops = [
            { crop: corn, num_crops: 100 },
            { crop: pumpkin, num_crops: 50 },
        ];

        const influencingFactors = {
            sun: "high",
            wind: "low",
        };

        expect(getTotalProfit({ crops }, influencingFactors)).toBe(16600);
    });
});