class Auction < ApplicationRecord
  validates :title, presence: true
  validates :starting_price, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
