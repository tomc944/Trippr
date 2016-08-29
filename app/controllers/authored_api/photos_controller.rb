class AuthoredApi::PhotosController < ApplicationController
  def create
    @photo = Photo.new(photo_params)

    @photo.author_id = current_user.id

    if @photo.save
      render :show
    else
      rediret_to new_authored_api_post_url
      render json: @photo.errors.full_messages, status: 422
    end
  end

  def show
    @photo = photo_lookup
  end

  def destroy
    @photo = photo_lookup
    @photo.destroy!
    render json: { id: params[:id] }
  end

  def index
    @photos = Photo.all
  end

  private
  def photo_params
    params.require(:photo).permit(:url, :post_id)
  end

  def photo_lookup
    Photo.find(params[:id])
  end
end
