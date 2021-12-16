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
Incubated/ Grants (0/1) (No/Yes)
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
questions: `Founder stake less than 50% (0/1)
Litigations (0/1)`.split("\n"),
weights: `-200
-200
`.split("\n"),
expected: `1
1`.split("\n"),
  },
};

export default ALGO;
