Rails.application.routes.draw do

	# Auth resources ---------------------------------------------------------

  resources :users, only: [:new, :create, :update]
  resource :session, only: [:new, :create, :destroy]

	# Reusable concerns for both APIs (avoids deep-nesting) -----------------------

	concern :imageable do
		resources :photos, except: [:edit, :update, :new]
	end

	concern :image_highlightable do
		resources :highlights, only: [:create, :index, :destroy, :show], concerns: :imageable
	end

  # Different APIs for authors and commenters -----------------------------------

	namespace :authored_api, defaults: { format: :json } do
		shallow do
			resources :posts, except: [:edit, :new], concerns: :image_highlightable
		end

    resources :highlights, only: [:index]
	end

	# ------------------------------------------------------------------------------
	root to: 'static_pages#root'
end
