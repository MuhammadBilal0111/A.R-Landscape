import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import { getPlantsDetails } from "../../../services/GlobalApi";

function PlantRecommendationSection() {
  const [plantsItem, setPlantsItem] = useState([]);

  useEffect(() => {
    // Fetch plant details when the component mounts
    const fetchPlants = async () => {
      try {
        const response = await getPlantsDetails();
        setPlantsItem(response?.data?.data); // Assuming response.data.data holds the plant array
      } catch (error) {
        console.error("Error fetching plant details:", error);
      }
    };
    fetchPlants();
  }, [plantsItem]);
  return (
    <div className="px-8">
      <h1 className="text-center text-3xl lg:text-5xl font-bold text-green-800">
        Recommendation for You
      </h1>
      <div className="flex flex-wrap gap-6 my-7 justify-center items-center">
        {plantsItem.length > 0 &&
          plantsItem.map((plant) => (
            <Card
              key={plant?._id} // Unique key for React
              title={plant.title} // title of the plant object
              image={plant?.imageUrl} // Assuming there is an `image` field
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
