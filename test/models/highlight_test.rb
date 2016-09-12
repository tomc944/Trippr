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

require 'test_helper'

class HighlightTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
