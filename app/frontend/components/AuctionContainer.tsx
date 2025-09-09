import { useEffect, useState } from "react";

import { Auction } from "./Auction";

interface AuctionData {
  id: number;
  title: string;
  description: string;
  starting_price: number;
  image_url: string;
}

export function AuctionContainer() {
  const [auctions, setAuctions] = useState<AuctionData[]>([]);

  useEffect(() => {
    fetch("/auctions")
      .then((response) => response.json())
      .then((data: AuctionData[]) => {
        const auctionsWithNumbers = data.map((auction) => ({
          ...auction,
          starting_price: parseFloat(auction.starting_price as unknown as string)
        }));
        setAuctions(auctionsWithNumbers);
      })
      .catch((error) => console.error("Error fetching auctions:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Current Auctions</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {auctions.map((auction) => (
          <Auction key={auction.id} {...auction} />
        ))}
      </div>
    </div>
  );
}
