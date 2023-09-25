import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Collection = {
  id: number;
  name: string;
};
const CollectionsScreen = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("http://localhost:3364/api/collections");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Read JSON data once
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Collections</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>{collection.name}</li>
        ))}
      </ul>
      <Link to="/collections/create">
        <button>Create Collection</button>
      </Link>
    </div>
  );
};

export default CollectionsScreen;
