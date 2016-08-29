class AuthoredApi::HighlightsController < ApplicationController
	def create
		@highlight = Highlight.new(highlight_params)

		# current_user should be availabe as a method available
		# from devise, but we need to double-check this

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
		# this only gives us all of the highlights
		# pertaining to a particular post
		post_id = params[:post_id]
		@highlights = Highlight.highlights_belonging_to_post(post_id)
	end

	def show
		@highlight = highlight_lookup
	end

	def destroy
		highlight_lookup.destroy
	end

	private
	def highlight_lookup
		Highlight.find(params[:id])
	end

	def highlight_params
		params.require(:highlight).permit(:highlight, :post_id)
	end
end
