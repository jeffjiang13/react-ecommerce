import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchItemsByQuery } from "../api/api";
import Item from "../components/Item";
import Box from "@mui/material/Box";

function SearchPage() {
  const { query } = useParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchItemsByQuery(query);
      setItems(data);
      setLoading(false);
    }
    fetchData();
  }, [query]);

  useEffect(() => {
    const searchResults = items.filter((item) =>
      item.attributes.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(searchResults);
  }, [items, query]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "180px", marginBottom: "100px" }}>
        Search results for "{query}"
      </h1>
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "180px", marginBottom: "100px" }}>Loading...</p>
      ) : filteredItems.length > 0 ? (
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {filteredItems.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      ) : (
        <p style={{ textAlign: "center", marginTop: "200px", marginBottom: "300px" }}>No items found.</p>
      )}
    </div>
  );
}

export default SearchPage;
