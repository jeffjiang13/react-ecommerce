// api/api.js
export const fetchItemsByQuery = async (query) => {
    try {
      const response = await fetch(
        `https://react-ecommerce-7d0j.onrender.com/api/items?populate=image&filter[name][$regex]=${encodeURIComponent(query)}&filter[name][$options]=i`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("Fetched data:", data); // Add this line
      return data.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  };
