
require 'byebug'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true}

  attr_reader :password

  has_many :total_highlights, class_name: "Highlight", foreign_key: :author_id
  has_many :authored_posts, class_name: "Post", foreign_key: :author_id
  has_many :total_photos, class_name: "Photo", foreign_key: :author_id

  after_initialize :ensure_session_token

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

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end


  private

  def authored_objs(total_objects)
    # not sure if there is a sleek Active Record Query method to handle this, but
    # this should do for now. We include :post in order to remove N+1 queries.

    total_objects.includes(:post).select { |obj| obj.post.author_id == obj.author_id }
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
