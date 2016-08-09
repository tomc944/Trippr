# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  name                   :string           default(""), not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
require 'byebug'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable

  has_many :total_highlights, class_name: "Highlight", foreign_key: :author_id
  
  has_many :authored_posts, class_name: "Post", foreign_key: :author_id
  
  has_many :total_photos, class_name: "Photo", foreign_key: :author_id

  ### Distinction of Types
    # Total photos refer to all Photos uploaded by a User
    # Authored photos refer to all Photos uploaded by a User on his/her own post
    # Guest photos refer to all Photos uploaded by a User not on his/her own post

  def authored_photos
    authored_objs(total_photos)
  end

  def guest_photos
    total_photos - authored_photos 
  end

  def authored_highlights
    authored_objs(total_highlights)
  end

  def guest_highlights
    total_highlights - authored_highlights
  end

  private
  def authored_objs(total_objects)
    # not sure if there is a sleek Active Record Query method to handle this, but
    # this should do for now. We include :post in order to remove N+1 queries.
    
    total_objects.includes(:post).select { |obj| obj.post.author_id == obj.author_id }
  end
end
