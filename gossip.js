const axios = require('axios');

// Generate a random integer for the ID
function getRandomId() {
  return Math.floor(Math.random() * 1_000_000);
}

// Generate a random user ID
function getRandomUserId() {
  // You can adjust the length/format of this as needed
  const randomString = Math.random().toString(36).substring(2, 10);
  return 'did:privy:cm6tv17ty0097u26e7daotxbw'
  //return `did:privy:${randomString}`;
  //did:privy:cm6tv17ty0097u26e7daotxbw
}

// Main function to send PATCH request
async function sendPatchRequest() {
  const randomId = '12'//getRandomId();
  const randomUserId = getRandomUserId();
  
  // Prepare request payload
  const data = {
    id: '34',
    type: "downvotes",
    userId: randomUserId
  };
  
  try {
    const response = await axios.patch('https://gossip-dao.vercel.app/api/gossip', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error making PATCH request:', error.message);
  }
}

// Execute the PATCH request
sendPatchRequest();
