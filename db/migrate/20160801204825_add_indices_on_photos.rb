class AddIndicesOnPhotos < ActiveRecord::Migration[5.0]
  def change
  	add_column :photos, :post_id, :integer
  	add_column :photos, :author_id, :integer
  end
end
