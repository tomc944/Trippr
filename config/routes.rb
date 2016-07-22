Rails.application.routes.draw do
	resources :users, only: [:create, :new]
	resource :session, only: [:create, :new, :destroy]

	namespace :api, defaults: {format: :json} do
		resources :posts, only: [:create, :index, :destroy, :udpate, :new]
	end

	root 'static_pages#root'
end
