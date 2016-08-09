# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  post       :text             not null
#  title      :string           not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
	validates :post, :title, presence: true

	belongs_to :user, foreign_key: :author_id
	has_many :highlights
	has_many :photos
end
