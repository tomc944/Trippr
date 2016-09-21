class AuthoredApi::UsersController < ApplicationController

  def create
    debugger
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render "authored_api/users/show"
    else
      render json: @user.errors, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
