interface AuctionProps {
  title: string;
  description: string;
  starting_price: number;
  image_url: string;
}

export function Auction({ title, description, starting_price, image_url }: AuctionProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md w-full md:w-1/3 lg:w-1/4">
      <img src={image_url} alt={title} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-lg font-semibold text-green-600">
        Starting at: ${starting_price.toFixed(2)}
      </p>
    </div>
  );
}
