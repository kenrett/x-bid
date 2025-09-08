Rails.application.routes.draw do
  get "auctions/index"
  get "up" => "rails/health#show", :as => :rails_health_check
  
  resource :session
  resource :registration, only: %i[new create]
  resources :passwords, param: :token

  root "app#show"
end
