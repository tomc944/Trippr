# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  post       :text             not null
#  title      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
	validates :post, :title, presence: true

	belongs_to :user
end
