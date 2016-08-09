Rails.application.routes.draw do
  
	# Authentication gem - no need for explicit routes-----------------------------
  
  devise_for :users
	
	# Reusable concerns for both APIs (avoids deep-nesting) -----------------------
	
	concern :imageable do 
		resources :images, except: [:edit, :update, :new]
	end

	concern :image_highlightable do
		resources :highlights, only: [:create, :index, :destroy] #, concerns: :imageable
	end
  
  # Different APIs for authors and commenters -----------------------------------

	namespace :authored_api, defaults: { format: :json } do
		shallow do 
			resources :posts, concerns: :image_highlightable
		end
	end

	namespace :commenter_api, defaults: { format: :json } do
	 	shallow do
	 		concerns :image_highlightable
	 	end
	end

	# ------------------------------------------------------------------------------
	root 'static_pages#root'
end
