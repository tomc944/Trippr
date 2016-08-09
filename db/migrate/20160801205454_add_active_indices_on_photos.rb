class AddActiveIndicesOnPhotos < ActiveRecord::Migration[5.0]
  def change
  	add_index :photos, :post_id
  	add_index :photos, :author_id
  end
end
