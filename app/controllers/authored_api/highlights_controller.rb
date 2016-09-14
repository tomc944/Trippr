class AuthoredApi::HighlightsController < ApplicationController
	def create
		@highlight = Highlight.new(highlight_params)
		@highlight.author_id = current_user.id

		if @highlight.save
			render :show
		else
			# not exactly sure if this is where we are going to redirect at
			# the moment
			redirect_to new_authored_api_post_url
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
		params.require(:highlight).permit(:post_id, :start_idx, :end_idx)
	end
end
