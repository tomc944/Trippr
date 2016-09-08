class AddStartWordAndEndWordColumnsToHighlights < ActiveRecord::Migration[5.0]
  def change
    add_column :highlights, :start_word, :integer, null: false, default: 0
    add_column :highlights, :end_word, :integer, null: false, default: 0
  end
end
