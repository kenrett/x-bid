class AddImageUrlToAuctions < ActiveRecord::Migration[8.0]
  def change
    add_column :auctions, :image_url, :string
  end
end