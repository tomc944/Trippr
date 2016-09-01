class ChangeUser < ActiveRecord::Migration[5.0]
  def change
    drop_table :users

    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.timestamps
    end

    add_index :users, :username, unique: true
  end
end
