class CreateTestMeta < ActiveRecord::Migration
  def self.up
    create_table :test_meta do |t|
      t.boolean :novel_administration                 
    end
  end
end
