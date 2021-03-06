# == Schema Information
#
# Table name: highlights
#
#  id         :integer          not null, primary key
#  post_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#  start_idx  :integer          default(0), not null
#  end_idx    :integer          default(0), not null
#

class Highlight < ApplicationRecord

	belongs_to :post, dependent: :destroy
	belongs_to :author, class_name: "User"

	has_many :highlight_photos
	has_many :photos, through: :highlight_photos, source: :photo

	private
	def self.highlights_belonging_to_post(post_id)
		self.where(post_id: post_id)
	end
end
