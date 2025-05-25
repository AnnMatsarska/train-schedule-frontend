import { Train } from "@/types/trains";

export const getTotalTrains = (trains: Train[]) => trains.length;

export const getMostPopularDeparture = (trains: Train[]) => {
  const countMap: Record<string, number> = {};
  trains.forEach((t) => {
    countMap[t.departure.station] = (countMap[t.departure.station] || 0) + 1;
  });

  const top = Object.entries(countMap).sort((a, b) => b[1] - a[1])[0];
  return top ? `${top[0]} (${top[1]})` : "-";
};

export const getAverageDuration = (trains: Train[]) => {
  if (!trains.length) return "-";
  const avgSec =
    trains.reduce((sum, t) => sum + (t.duration || 0), 0) / trains.length;
  const minutes = Math.floor(avgSec / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const getAveragePrice = (trains: Train[]) => {
  if (!trains.length) return "-";

  const avg =
    trains.reduce((sum, t) => sum + (Number(t.price) || 0), 0) / trains.length;
  return `$${avg.toFixed(2)}`;
};
