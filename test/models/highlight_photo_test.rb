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

require 'test_helper'

class HighlightPhotoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
