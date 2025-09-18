class Api::V1::AuctionsController < Api::V1::BaseController
  def index
    @auctions = Auction.all
    return render json: { error: "Not Found" }, status: :not_found unless @auctions
    
    render json: @auctions
  end

  def show
    @auction = Auction.find(params[:id])
    return render json: { error: "Not Found" }, status: :not_found unless @auction

    render json: @auction
  end
end
