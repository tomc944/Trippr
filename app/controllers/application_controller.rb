class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :logged_in?

 	private
 	def current_user
 		return nil unless session[:session_token]
 		@current_user ||= User.find_by_session_token(session[:session_token])
 	end

 	def login_user!(user)
 		session[:session_token] = user.reset_session_token!
 	end

 	def logged_in?
 		!!current_user
 	end

 	def logout_user!
 		current_user.reset_session_token!
 		session[:session_token] = nil
 	end

 	def require_no_user!
 		redirect_to user_url(current_user) if current_user
 	end

 	def require_user!
 		redirect_to new_session_url unless current_user
 	end
end
