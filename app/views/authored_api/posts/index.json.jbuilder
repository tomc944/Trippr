json.array!(@posts) do |post|
	json.partial!('authored_api/posts/post', post: post)
end
