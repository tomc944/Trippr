class AddThumbnailUrlToPhotos < ActiveRecord::Migration[5.0]
  def change
    add_column :photos, :thumbnail_url, :string, null: false, default: ''
  end
end
