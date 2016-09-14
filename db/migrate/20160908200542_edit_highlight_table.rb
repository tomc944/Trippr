class EditHighlightTable < ActiveRecord::Migration[5.0]
  def change
    rename_column :highlights, :start_word, :start_idx
    rename_column :highlights, :end_word, :end_idx
  end
end
