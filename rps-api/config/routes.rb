Rails.application.routes.draw do
  resources :players do
    resources :games
  end
end
