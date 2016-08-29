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

	def show
		@post = post_lookup
	end

	def create
		@post = Post.create(post_params)
		@post[:author_id] = current_user.id

		if @post.save
			# figure out how highlighting will be handled
			# after creation of post
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
		Post.find(params[:id])
	end

	def post_params
		params.require(:post).permit(:title, :body)
	end
end
