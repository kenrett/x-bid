class AuctionsController < ApplicationController
  def index
    @auctions = Auction.all
    p "*" * 100
    p @auctions.count

    render json: @auctions
  end
end
