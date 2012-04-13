class AddSessionToTrial < ActiveRecord::Migration
  def change
    add_column :trials, :session, :integer

  end
end
