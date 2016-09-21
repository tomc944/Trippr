class AuthoredApi::HighlightsController < ApplicationController
	def create
		@highlight = Highlight.new(highlight_params)
		@highlight.author_id = current_user.id

		@photo = Photo.new(photo_params)
		@photo.author_id = current_user.id
		@photo.post_id = @highlight.post_id

		completed_transaction = @highlight.transaction do
			@highlight.save
			@photo.save
			highlight_photo_params = {photo_id: @photo.id, highlight_id: @highlight.id}
			@highlight_photo = HighlightPhoto.new(highlight_photo_params)
			@highlight_photo.save
		end

		if completed_transaction
			render :show
		else
			render json: @highlight.errors.full_messages, status: 422
		end
	end

	def index
		if params[:post_id]
			@highlights = Highlight.where(post_id: params[:post_id])
		else
			@highlights = Highlight.all
		end
	end

	def show
		@highlight = highlight_lookup
	end

	def destroy
		highlight_lookup.destroy
		render json: { id: params[:id] }
	end

	private
	def highlight_lookup
		Highlight.find(params[:id])
	end

	def highlight_params
		params.require(:highlight).permit(:post_id, :start_idx, :end_idx, :first_image)
	end

	def photo_params
		params.require(:first_image).permit(:url, :thumbnail_url)
	end
end
