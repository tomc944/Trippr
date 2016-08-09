# == Schema Information
#
# Table name: highlight_photos
#
#  id           :integer          not null, primary key
#  photo_id     :integer          not null
#  highlight_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class HighlightPhoto < ApplicationRecord
	belongs_to :highlight
	belongs_to :photo
end
