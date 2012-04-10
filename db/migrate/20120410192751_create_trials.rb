class CreateTrials < ActiveRecord::Migration
  def change
    create_table :trials do |t|
      t.integer :user_id
      t.string :text_color
      t.string :ink_color
      t.string :condition
      t.string :mode
      t.string :answer_color
      t.boolean :correct
      t.integer :response_time      
      t.string :note

      t.timestamps
    end
  end
end
