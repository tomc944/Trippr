class Image < ApplicationRecord
	validates :url, presence: true

	belongs_to :highlight, dependent: :destroy
end