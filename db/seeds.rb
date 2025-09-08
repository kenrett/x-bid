Auction.destroy_all
User.destroy_all

User.create!(
  email_address: "admin@example.com",
  password: "password",
  password_confirmation: "password",
  role: :admin
)

User.create!(
  email_address: "user@example.com",
  password: "password",
  password_confirmation: "password",
  role: :user
)

20.times do |i|
  Auction.create!(
    title: Faker::Commerce.product_name,
    description: Faker::Lorem.paragraph(sentence_count: 3),
    starting_price: Faker::Commerce.price(range: 10..1000).round(2),
    image_url: Faker::Avatar.unique.image
  )
  print "*"
end