json.array!(@posts) do |post|
	json.extract!(post, :id, :title, :post, :photos)
end
