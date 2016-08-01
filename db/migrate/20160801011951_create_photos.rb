class CreatePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :photos do |t|
    	t.string  :url,          null: false
    	t.integer :highlight_id, null: false
    	t.timestamps
    end
    add_index :photos, :highlight_id
  end
end
