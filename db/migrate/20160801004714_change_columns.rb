class ChangeColumns < ActiveRecord::Migration[5.0]
  def change
  	rename_column :posts,      :user_id,        :author_id
  	add_column    :highlights, :highlighter_id, :integer
  	add_index     :highlights, :highlighter_id
  end
end
