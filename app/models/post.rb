class Post < ApplicationRecord
	validates :post, :title, presence: true

	belongs_to :user

	# maybe handle grabbing individual words on the backend?
end
