import { useEffect, useState } from 'react';

import { Auction } from '../Auction/Auction';
import { AuctionDetail } from '../AuctionDetail/AuctionDetail';

export interface AuctionData {
  id: number;
  title: string;
  description: string;
  starting_price: number;
  image_url: string;
}

export function AuctionContainer() {
  const [auctions, setAuctions] = useState<AuctionData[]>([]);
  const [selectedAuction, setSelectedAuction] = useState<AuctionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('/auctions');
        const data = (await response.json()) as AuctionData[];
        const auctionsWithNumbers = data.map((auction) => ({
          ...auction,
          starting_price: parseFloat(auction.starting_price as unknown as string),
        }));
        setAuctions(auctionsWithNumbers);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchAuctions();
  }, []);

  const handleAuctionClick = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/auctions/${id}`);
      const auction = (await response.json()) as AuctionData;
      auction.starting_price = parseFloat(auction.starting_price as unknown as string);
      setSelectedAuction(auction);
    } catch (error) {
      console.error('Error fetching auction details:', error);
    }
    setLoading(false);
  };

  const handleBack = () => {
    setSelectedAuction(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (selectedAuction) {
    return <AuctionDetail auction={selectedAuction} onBack={handleBack} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Current Auctions</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {auctions.map((auction) => (
          <Auction key={auction.id} {...auction} onClick={handleAuctionClick} />
        ))}
      </div>
    </div>
  );
}
