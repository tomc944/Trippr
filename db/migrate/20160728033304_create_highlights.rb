class CreateHighlights < ActiveRecord::Migration[5.0]
  def change
    create_table :highlights do |t|
    	t.text :highlight, null: false
    	t.integer :post_id, null: false
      t.timestamps
    end
    add_index :highlights, :post_id
  end
end
