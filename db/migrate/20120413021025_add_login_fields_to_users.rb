class AddLoginFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string

    add_column :users, :last_name, :string

    add_column :users, :login_id, :string

    remove_column :users, :id_hash
  end
end
