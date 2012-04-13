class AddCombinationToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :combination, :string

  end
end
