class RemoveHighlighterId < ActiveRecord::Migration[5.0]
  def change
  	remove_column :highlights, :highlighter_id, :integer
  	remove_column :highlights, :highligher_id,  :integer
  end
end
