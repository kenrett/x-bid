Rails.application.routes.draw do
  get "up" => "rails/health#show", :as => :rails_health_check
  
  resource :session
  resource :registration, only: %i[new create]
  resources :passwords, param: :token

  resources :auctions, only: %i[index]

  root "app#show"
end
