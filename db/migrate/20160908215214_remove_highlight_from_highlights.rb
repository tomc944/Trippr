class RemoveHighlightFromHighlights < ActiveRecord::Migration[5.0]
  def change
    remove_column :highlights, :highlight
  end
end
