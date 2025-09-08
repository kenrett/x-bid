class CreateAuctions < ActiveRecord::Migration[8.0]
  def change
    create_table :auctions do |t|
      t.string :title
      t.text :description
      t.datetime :start_date
      t.datetime :end_date
      t.decimal :starting_price

      t.timestamps
    end
  end
end
