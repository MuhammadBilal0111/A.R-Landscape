import React, { useState, useEffect, useMemo } from "react";
import Card from "../../../components/Card";
import { getPlantsDetails } from "../../../services/GlobalApi";

function PlantRecommendationSection() {
  const [plantsItem, setPlantsItem] = useState([]);
  useEffect(() => {
    // Fetch plant details when the component mounts
    const fetchPlants = async () => {
      try {
        const response = await getPlantsDetails("?limit=5&order=desc");
        setPlantsItem(response?.data?.data); // Assuming response.data.data holds the plant array
      } catch (error) {
        console.error("Error fetching plant details:", error);
      }
    };
    fetchPlants();
  }, []);
  console.log(plantsItem);
  const memoizedPlantItems = useMemo(() => plantsItem, [plantsItem]);
  return (
    <div className="px-8">
      <h1 className="text-center text-3xl lg:text-5xl font-bold text-green-800">
        Recommendations for You
      </h1>
      <div className="flex flex-wrap gap-6 my-7 justify-center items-center">
        {memoizedPlantItems.length > 0 &&
          memoizedPlantItems.map((plant) => (
            <Card
              key={plant?._id} // Unique key for React
              title={plant.title} // title of the plant object
              image={plant?.imageUrl[0]} // Assuming there is an `image` field
              description={plant?.description} // Assuming there is a `description` field
              price={plant?.price} // Assuming there is a `description` field
              slug={plant?.slug} // Assuming there is a `description` field
            />
          ))}
      </div>
    </div>
  );
}

export default PlantRecommendationSection;
