# == Schema Information
#
# Table name: highlights
#
#  id         :integer          not null, primary key
#  highlight  :text             not null
#  post_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#

class Highlight < ApplicationRecord
	validates :highlight, presence: true

	belongs_to :post, dependent: :destroy
	belongs_to :author, class_name: "User"

	has_many :highlight_photos
	has_many :photos, through: :highlight_photos, source: :photo
end
