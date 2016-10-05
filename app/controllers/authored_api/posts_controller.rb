class AuthoredApi::PostsController < ApplicationController
	def index
		@posts = Post.all
	end

	def by_page
		@posts = Post.page(params[:page_num]).all.includes(:photos)

		if @posts.empty?
			render json: "empty"
		end
	end

	def show
		@post = post_lookup
	end

	def create
		@post = Post.new(post_params)
		@post[:author_id] = current_user.id
		@photo = Photo.new(photo_params)
		@photo[:author_id] = current_user.id

		completed_transaction = @post.transaction do
			@post.save!
			@photo[:post_id] = @post.id
			@photo.save!
		end

		if completed_transaction
			render :show
		else
			redirect_to new_authored_api_post_url
			render json: @post.errors.full_messages, status: 422
		end
	end

	def update
		# needs to be finished
		@post = post_lookup
		@post.update!(post_params)
		render :show
	end

	def destroy
		@post = post_lookup
		@post.destroy!
		render json: { id: params[:id] }
	end

	private
	def post_lookup
		Post.includes(:photos, highlights: :photos).find(params[:id])
	end

	def post_params
		params.require(:post).permit(:title, :post, :author_id)
	end

	def photo_params
		params.require(:post).permit(:url, :thumbnail_url)
	end
end
