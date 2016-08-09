class AddAuthorIdOnHighlight < ActiveRecord::Migration[5.0]
  def change
  	add_column :highlights, :author_id, :integer
  end
end
