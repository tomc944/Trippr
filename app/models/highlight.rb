# == Schema Information
#
# Table name: highlights
#
#  id         :integer          not null, primary key
#  highlight  :text             not null
#  post_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Highlight < ApplicationRecord
	validates :highlight, presence: true

	belongs_to :post, dependent: :destroy
end
