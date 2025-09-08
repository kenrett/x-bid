class User < ApplicationRecord
  enum role: { user: 0, admin: 1 }

  has_secure_password
  has_many :sessions, dependent: :destroy

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
