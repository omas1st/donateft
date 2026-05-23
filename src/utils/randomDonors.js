// frontend/src/utils/randomDonors.js

// 60 diverse names (Australian, American, UK, and common names)
const firstNames = [
  // American / Common
  'Joe', 'David', 'James', 'Michael', 'John', 'Robert', 'William', 'Charles', 'Thomas', 'Christopher',
  'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth', 'Joshua',
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
  // Australian / UK
  'Lachlan', 'Mitchell', 'Jesse', 'Cooper', 'Harley', 'Flynn', 'Hunter', 'Blake', 'Caleb', 'Liam',
  'Olivia', 'Charlotte', 'Amelia', 'Isla', 'Mia', 'Grace', 'Chloe', 'Ella', 'Emily', 'Sophie',
  'Noah', 'Ethan', 'Lucas', 'Oliver', 'Henry', 'Jack', 'Harry', 'William', 'Edward', 'George'
];

// Possible amounts: low range (10-100 step 10) and high range (150-500 step 50)
const lowAmounts = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const highAmounts = [150, 200, 250, 300, 350, 400, 450, 500];
const allPossibleAmounts = [...lowAmounts, ...highAmounts];

const generateRandomDonors = () => {
  const donors = [];
  for (let i = 0; i < 60; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastNameMask = '******';
    const lastFourDigits = Math.floor(1000 + Math.random() * 9000);
    // Pick a random amount from the combined list
    const amount = allPossibleAmounts[Math.floor(Math.random() * allPossibleAmounts.length)];
    donors.push({
      id: i,
      displayName: `${firstName} ${lastNameMask}${lastFourDigits}`,
      amount: amount,
    });
  }
  return donors;
};

export const randomDonors = generateRandomDonors();