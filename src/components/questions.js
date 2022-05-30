var MULTIFORM = {
  "Blockchain/Fintech": {
    questions: [
      "Average Transaction Value Growth (MoM)",
      "Adoption Growth (MOM )- Customers, Orders, Clients, Retention rate",
      "How strong is the Security Metric (10 points)",
      "Revenue Growth MoM",
      "How strong is the USP/MOAT (Out of 10)",
    ],
    weights: [200, 200, 50, 100, 50],
    expected: [5, 5, 10, 5, 10],
  },
  "Content/Gaming": {
    questions: [
      "MoM % Growth in total adoption (customers, articles, clients)",
      "MoM % Growth in Active paid/free customers",
      "How good is the Clientele (10 points)",
      "Revenue Growth MoM",
      "How strong is the USP/MOAT (Out of 10)",
    ],
    weights: [100, 200, 150, 100, 50],
    expected: [5, 5, 10, 5, 10],
  },
  DeepTech: {
    questions: [
      "Do they have any lead/contract/grant with Govt/Govt Dept./Govt Companies/other companies? (10 points)",
      "Do they have the requisite IPR, either applied or granted? (1-No; 2-applied; 3-granted)",
      "At what stage is the research/product? (5- commercialized, 4 -ready to market, 3-Clinical trails ongoing, 2-MVP ready, 1-Lab stage ",
      "Revenue Growth MoM",
      "How strong is the USP/MOAT (Out of 10)",
    ],
    weights: [150, 150, 150, 50, 100],
    expected: [10, 3, 3, 1, 10],
  },
  "EV - Charging": {
    questions: [
      "Charging Station % growth MoM ",
      "MoM % Growth in total adoption (customers, clients, order value)",
      "Do they have any Patents either granted/applied? (0 - No/ 1 - Yes)",
      "No. of charging cycles/ Battery or Product  life/Durability vs Peers (out of 10)/ do they have any tie ups?",
      "How strong is the USP/MOAT (Out of 10)",
    ],
    weights: [150, 150, 150, 100, 50],
    expected: [5, 5, 10, 10, 10],
  },
  "Platform - B2B": {
    questions: [
      "MoM % Growth in total adoption (customers, clients)",
      "How good is the clientele (10 points)",
      "Revenue Growth MoM%",
      "Gross Margins",
      "How strong is the USP/MOAT (Out of 10)",
    ],
    weights: [150, 150, 150, 100, 50],
    expected: [5, 10, 5, 50, 10],
  },
  "Product - B2C": {
    questions: [
      "MOM % Growth in Revenue",
      "Gross Margins",
      "Adoption Growth (MOM )- Customers, Orders, Clients, Retention rate",
      "Geographic locations served (10 < Pan India)",
      "How strong is the USP/MOAT (Out of 10)",
    ],
    weights: [150, 150, 150, 100, 50],
    expected: [5, 30, 5, 10, 10],
  },
  "Platform - B2C": {
    questions: [
      "MoM % Growth in Active or paid usrs/clients/customers",
      "Gross Margins ",
      "Revenue Growth MoM%",
      "MoM % Growth in total adoption (customers, clients)",
      "How strong is the USP/MOAT (Out of 10)",
    ],
    weights: [150, 150, 150, 100, 50],
    expected: [5, 30, 5, 5, 10],
  },
};

var ALGO = {
  layer1: {
    questions: `MoM % Growth in Active or paid usrs/clients/customers
Gross Margins 
Revenue Growth MoM%
MoM % Growth in total adoption (customers, clients)
How strong is the USP/MOAT (Out of 10)`.split("\n"),
    weights: `150
150
150
100
50`.split("\n"),
    expected: `5
30
5
5
10`.split("\n"),
  },
  layer2: {
    questions: `Team's Strength (1000 points)
Existing investors in the earlier round (1000 points)
Incubated/ Grants (0 - No / 1 - Yes)
Known name/Grants >50L (1000 points)`.split("\n"),
    weights: `100
100
100
100`.split("\n"),
    expected: `1000
1000
1
1000`.split("\n"),
  },
  layer3: {
    questions: `Founder stake less than 50% (0 - No / 1 - Yes)
Litigations (0 - No / 1 - Yes)`.split("\n"),
    weights: `-200
-200
`.split("\n"),
    expected: `1
1`.split("\n"),
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export { ALGO, MULTIFORM };
