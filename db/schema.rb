# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160908215214) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "highlight_photos", force: :cascade do |t|
    t.integer  "photo_id",     null: false
    t.integer  "highlight_id", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["photo_id", "highlight_id"], name: "index_highlight_photos_on_photo_id_and_highlight_id", unique: true, using: :btree
  end

  create_table "highlights", force: :cascade do |t|
    t.integer  "post_id",                null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "author_id"
    t.integer  "start_idx",  default: 0, null: false
    t.integer  "end_idx",    default: 0, null: false
    t.index ["author_id"], name: "index_highlights_on_author_id"
    t.index ["post_id"], name: "index_highlights_on_post_id"
  end

  create_table "photos", force: :cascade do |t|
    t.string   "url",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "post_id"
    t.integer  "author_id"
    t.index ["author_id"], name: "index_photos_on_author_id", using: :btree
    t.index ["post_id"], name: "index_photos_on_post_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.text     "post",       null: false
    t.string   "title",      null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_posts_on_author_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
