class Category < ApplicationRecord
  has_many :auction_categories, dependent: :destroy
  has_many :auctions, through: :auction_categories
  validates :name, presence: true, uniqueness: true
end