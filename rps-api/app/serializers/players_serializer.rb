class PlayersSerializer < ActiveModel::Serializer
  attributes :all_players_games

  def all_players_games
    object.map do |player|
      { username: player.username, games: player.games }
    end
  end
end
