class CreateAuctionCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :auction_categories do |t|
      t.references :auction, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.timestamps
    end
    add_index :auction_categories, [:auction_id, :category_id], unique: true
  end
end