class CreateHighlightPhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :highlight_photos do |t|
    	t.integer :photo_id,     null: false
    	t.integer :highlight_id, null: false
      t.timestamps
    end
    add_index :highlight_photos, [:photo_id, :highlight_id], :unique => true
  end
end
