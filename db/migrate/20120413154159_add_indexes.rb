class AddIndexes < ActiveRecord::Migration
  def up
    add_index :trials, :user_id
    add_index :trials, [ :user_id, :created_at ]
    add_index :trials, [ :session, :mode, :combination, :trial_num ]
    add_index :trials, :session
  end

  def down
    remove_index :trials, :user_id
    remove_index :trials, [ :user_id, :created_at ]
    remove_index :trials, [ :session, :mode, :combination, :trial_num ]
    remove_index :trials, :session    
  end
end
