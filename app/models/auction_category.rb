class AuctionCategory < ApplicationRecord
  belongs_to :auction
  belongs_to :category
end