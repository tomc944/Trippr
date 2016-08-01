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

require 'test_helper'

class HighlightTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
