# == Schema Information
#
# Table name: photos
#
#  id            :integer          not null, primary key
#  url           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  post_id       :integer
#  author_id     :integer
#  thumbnail_url :string           default(""), not null
#

class Photo < ApplicationRecord
	validates :url, :thumbnail_url, presence: true

	belongs_to :post, dependent: :destroy
	belongs_to :author, class_name: "User"

	has_many :highlight_photos
	has_many :highlights, through: :highlight_photos, source: :highlight

	default_scope { order('created_at ASC') }
end
