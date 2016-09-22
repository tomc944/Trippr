class AuthoredApi::PhotosController < ApplicationController
  def create
    @photo = Photo.new(photo_params)
    highlight_info = highlight_params

    @photo.author_id = current_user.id
    @photo.post_id = highlight_info[:post_id]

    completed_transaction = @photo.transaction do
      @photo.save
      highlight_photo_params = {photo_id: @photo.id, highlight_id: highlight_info[:id]}
      @highlight_photo = HighlightPhoto.new(highlight_photo_params)
      @highlight_photo.save
    end

    if completed_transaction
      render :show
    else
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
    params.require(:photo).permit(:url, :thumbnail_url)
  end

  def highlight_params
    params.require(:highlight).permit(:id, :post_id)
  end

  def photo_lookup
    Photo.includes(:highlights).find(params[:id])
  end
end
