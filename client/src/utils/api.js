// src/utils/api.js

export async function getUserData(token) {
  const response = await fetch('https://your-strapi-url.com/users/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json();
}
