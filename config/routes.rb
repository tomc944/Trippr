Rails.application.routes.draw do
	# Reusable concerns for both APIs (avoids deep-nesting) -----------------------

	concern :imageable do
		resources :photos, except: [:edit, :update, :new]
	end

	concern :image_highlightable do
		resources :highlights, only: [:create, :index, :destroy, :show], concerns: :imageable
	end

  # Different APIs for authors and commenters -----------------------------------

	namespace :authored_api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]

    shallow do
			resources :posts, except: [:edit, :new], concerns: :image_highlightable
		end

    get 'posts/by_page/:page_num', :to => 'posts#by_page'

    resources :highlights, only: [:index]
	end

	# ------------------------------------------------------------------------------
	root to: 'static_pages#root'
end
