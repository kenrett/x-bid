require 'rails_helper'

RSpec.describe Auction, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      auction = Auction.new(
        title: 'Vintage Painting',
        description: 'A beautiful piece of art.',
        start_date: DateTime.now,
        end_date: DateTime.now + 7.days,
        starting_price: 100.00
      )
      expect(auction).to be_valid
    end

    it 'is not valid without a title' do
      auction = Auction.new(title: nil)
      expect(auction).not_to be_valid
    end

    it 'is not valid without a starting_price' do
      auction = Auction.new(starting_price: nil)
      expect(auction).not_to be_valid
    end

    it 'is not valid with a negative starting_price' do
      auction = Auction.new(starting_price: -10)
      expect(auction).not_to be_valid
    end
  end
end
