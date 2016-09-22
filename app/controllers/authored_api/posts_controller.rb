class AuthoredApi::PostsController < ApplicationController
	def index
		# do we want to show all Posts as a feed OR
		# will this be a landing page for only the author's posts
		if params[:authored_posts]
			@posts = current_user.authored_posts
		else
			@posts = Post.includes(:highlights, :photos)
		end
	end

	def by_page
		@posts = Post.page(params[:page_num]).all.includes(:highlights, :photos)

		if @posts.empty?
			render json: "empty"
		end
	end

	def show
		@post = post_lookup
		# debugger
	end

	def create
		@post = Post.new(post_params)
		@post[:author_id] = current_user.id

		if @post.save
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
end
