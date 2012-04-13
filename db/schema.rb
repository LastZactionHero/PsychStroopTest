# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120413154159) do

  create_table "test_meta", :force => true do |t|
    t.boolean "novel_administration"
  end

  create_table "trials", :force => true do |t|
    t.integer  "user_id"
    t.string   "text_color"
    t.string   "ink_color"
    t.string   "condition"
    t.string   "mode"
    t.string   "answer_color"
    t.boolean  "correct"
    t.integer  "response_time"
    t.string   "note"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
    t.integer  "session"
    t.integer  "trial_num"
    t.string   "combination"
  end

  add_index "trials", ["session", "mode", "combination", "trial_num"], :name => "index_trials_on_session_and_mode_and_combination_and_trial_num"
  add_index "trials", ["session"], :name => "index_trials_on_session"
  add_index "trials", ["user_id", "created_at"], :name => "index_trials_on_user_id_and_created_at"
  add_index "trials", ["user_id"], :name => "index_trials_on_user_id"

  create_table "users", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "login_id"
  end

end
