import { useEffect, useState } from "react";

import { Auction } from "./Auction";

interface AuctionData {
  id: number;
  title: string;
  description: string;
  starting_price: number;
}

export function AuctionContainer() {
  const [auctions, setAuctions] = useState<AuctionData[]>([]);

  useEffect(() => {
    fetch("/auctions")
      .then((response) => response.json())
      .then((data: AuctionData[]) => setAuctions(data))
      .catch((error) => console.error("Error fetching auctions:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Current Auctions</h1>
      <div className="flex flex-wrap gap-4">
        {auctions.map((auction) => (
          <Auction key={auction.id} {...auction} />
        ))}
      </div>
    </div>
  );
}
