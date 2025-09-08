require 'rails_helper'

RSpec.describe "Auctions", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/auctions/index"
      expect(response).to have_http_status(:success)
    end
  end

end
