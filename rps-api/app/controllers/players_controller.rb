class PlayersController < ApplicationController
  before_action :find_player, only: [:show, :update, :destroy]

  # GET /players
  def index
    render json: Player.all, serializer: PlayersSerializer
  end


  # POST /players
  def create
    @player = Player.create!(player_params)
    json_response(@player, :created)
  end

  # GET /players/:id
  def show
    json_response(@player)
  end

  # PUT /players/:id
  def update
    @player.update(player_params)
    head :no_content
  end

  # DELETE /players/:id
  def destroy
    @player.destroy
    head :no_content
  end

  private

  def player_params
    params.require(:player).permit(:username, games: %i[id computer_move player_move game_score])
  end

  def find_player
    @player = Player.find(params[:id])
  end
end
