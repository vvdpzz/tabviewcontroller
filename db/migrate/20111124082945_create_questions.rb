class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title
      t.text :content
      
      t.integer :answers_count, :default => 0
      t.integer :votes_count, :default => 0

      t.timestamps
    end
  end
end
