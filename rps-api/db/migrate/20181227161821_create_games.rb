class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :computer_move
      t.string :player_move
      t.integer :game_score
      t.references :player, foreign_key: true

      t.timestamps
    end
  end
end
