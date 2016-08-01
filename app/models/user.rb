class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable

  has_many :authored_posts, class_name: "Post", foreign_key: :author_id
  has_many :authored_highlights, through: :authored_posts
  has_many :photos, through: :authored_highlights

  has_many :commented_highlights, class_name: "Highlight", foreign_key: :hightlighter_id
end
