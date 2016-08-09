class ChangeSchematoFinal < ActiveRecord::Migration[5.0]
  def change
  	remove_column :photos, :highlight_id, :integer
  	remove_column :highlights, :highlighter_id, :integer
  end
end
