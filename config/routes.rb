Rails.application.routes.draw do
  get "up" => "rails/health#show", :as => :rails_health_check

  namespace :api do
    namespace :v1 do
      resource :session
      resource :registration, only: %i[new create]
      resources :passwords, param: :token
  
      get "current_user" => "current_user#show"
  
      resources :auctions, only: %i[index show]
    end
  end

  # root "api/v1/auctions#index"
  root "api/v1/base#show"
end
