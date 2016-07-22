class SessionsController < ApplicationController
	before_action :require_no_user!, only: [:new, :create]

	def new
		render :new
	end

	def create
		user = User.find_by_credentials(
			params[:user][:username],
			params[:user][:password]
		)

		if user
			login_user!(user)
			redirect_to root_url
		else
			flash.now[:errors] = ["Incorrect username and/or password"]
			render :new
		end
	end

	def destroy
		logout_user!
		render json: {logout: "Logging out"}
	end
end