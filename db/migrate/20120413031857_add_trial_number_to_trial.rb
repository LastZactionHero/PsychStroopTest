class AddTrialNumberToTrial < ActiveRecord::Migration
  def change
    add_column :trials, :trial_num, :integer

  end
end
