class Player < ApplicationRecord
  has_many :games, dependent: :destroy
  accepts_nested_attributes_for :games, allow_destroy: true
  validates_presence_of :username

  def self.calculate_leader_board
    Player.all.map do |player|
      wins = player.games.select{|game| game.game_score == 1}.length
      losses = player.games.select{|game| game.game_score == -1}.length
      draws = player.games.select{|game| game.game_score == 0}.length
      rocks = player.games.select{|game| game.player_move == '1'}.length
      papers = player.games.select{|game| game.player_move == '2'}.length
      scissors = player.games.select{|game| game.player_move == '3'}.length
      computer_rocks = player.games.select{|game| game.computer_move == '1'}.length
      computer_papers = player.games.select{|game| game.computer_move == '2'}.length
      computer_scissors = player.games.select{|game| game.computer_move == '3'}.length
      {
        player: player.username,
        wins: wins,
        losses: losses,
        draws: draws,
        total_score: wins - losses,
        rock: rocks,
        paper: papers,
        scissors: scissors,
        computer_rock: computer_rocks,
        computer_paper: computer_papers,
        computer_scissors: computer_scissors
      }
    end
  end

  def calculate_player_stats
    wins = games.select{|game| game.game_score == 1}.length
    losses = games.select{|game| game.game_score == -1}.length
    draws = games.select{|game| game.game_score == 0}.length
    rocks = games.select{ |game| game.player_move == '1' }.length
    papers = games.select{|game| game.player_move == '2'}.length
    scissors = games.select{|game| game.player_move == '3'}.length
    computer_rocks = games.select{|game| game.computer_move == '1'}.length
    computer_papers = games.select{|game| game.computer_move == '2'}.length
    computer_scissors = games.select{|game| game.computer_move == '3'}.length
      {
        wins: wins,
        losses: losses,
        draws: draws,
        total_score: wins - losses,
        rock: rocks,
        paper: papers,
        scissors: scissors,
        computer_rock: computer_rocks,
        computer_paper: computer_papers,
        computer_scissors: computer_scissors
      }
  end
end
