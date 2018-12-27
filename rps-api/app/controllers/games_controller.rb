class GamesController < ApplicationController
  before_action :find_game
  before_action :find_player_game, only: %i[show update destroy]

  # GET /players/:player_id/games
  def index
    json_response(@player.games)
  end

  # GET /players/:player_id/games/:id
  def show
    json_response(@game)
  end

  # POST /players/:player_id/games
  def create
    @player.games.create!(game_params)
    json_response(@player, :created)
  end

  # POST /players/:player_id/games/:id
  def update
    @game.update(game_params)
    head :no_content
  end

  # DELETE /players/:player_id/games/:id
  def destroy
    @game.destroy
    head :no_content
  end

  private

  def game_params
    params.permit(:computer_move, :player_move, :game_score)
  end

  def find_game
    @player = Player.find(params[:player_id])
  end

  def find_player_game
    @game = @player.games.find_by!(id: params[:id]) if @player
  end
end
