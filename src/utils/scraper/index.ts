// src/utils/scraper/index.ts

import { env } from "@/config";

export const productScraperTrigger = async (url: string) => {
  const { BRIGHT_DATA_API_KEY, DATASET_ID, NOTIFY_URL: ENDPOINT } = env;

  const requestBody = [
    {
      url,
    },
  ];

  const response = await fetch(
    `https://api.brightdata.com/datasets/v3/trigger?dataset_id=${DATASET_ID}&endpoint=${encodeURIComponent(
      ENDPOINT
    )}&format=json&uncompressed_webhook=true&include_errors=true`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BRIGHT_DATA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Failed to trigger product scraper:", error);
    throw new Error("Failed to trigger product scraper webhook.");
  }

  const data: { snapshot_id: string } = await response.json();

  // Log and return the snapshot ID for further processing
  console.log(`Webhook triggered successfully:`, data);
  return { snapshot_id: data.snapshot_id };
};
