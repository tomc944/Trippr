class AddIndexOnAuthorId < ActiveRecord::Migration[5.0]
  def change
  	add_index :highlights, :author_id
  end
end
