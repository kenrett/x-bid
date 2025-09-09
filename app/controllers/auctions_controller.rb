class AuctionsController < ApplicationController
  def index
    @auctions = Auction.all

    render json: @auctions
  end
end
