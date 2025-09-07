Rails.application.routes.draw do
  get "up" => "rails/health#show", :as => :rails_health_check
  
  resource :session
  resource :registration, only: %i[new create]
  resources :passwords, param: :token

  root "home#show"
end
