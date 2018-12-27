# spec/requests/games_spec.rb
require 'rails_helper'

RSpec.describe 'Games API' do
  # Initialize the test data
  let!(:player) { create(:player) }
  let!(:games) { create_list(:game, 60, player_id: player.id) }
  let(:player_id) { player.id }
  let(:id) { games.first.id }

  # Test suite for GET /players/:player_id/games
  describe 'GET /players/:player_id/games' do
    before { get "/players/#{player_id}/games" }

    context 'when player exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all player games' do
        expect(json.size).to eq(60)
      end
    end

    context 'when player does not exist' do
      let(:player_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Player/)
      end
    end
  end

  # Test suite for GET /players/:player_id/games/:id
  describe 'GET /players/:player_id/games/:id' do
    before { get "/players/#{player_id}/games/#{id}" }

    context 'when player game exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the game' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when player game does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Game/)
      end
    end
  end

  # Test suite for PUT /players/:player_id/games
  describe 'POST /players/:player_id/games' do
    let(:valid_attributes) { { computer_move: rand(1..3), player_move: rand(1..3), game_score: rand(0..1)} }

    context 'when request attributes are valid' do
      before { post "/players/#{player_id}/games", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    # context 'when an invalid request' do
    #   before { post "/players/#{player_id}/games", params:  }
    #
    #   it 'returns status code 422' do
    #     expect(response).to have_http_status(422)
    #   end
    #
    #   it 'returns a failure message' do
    #     expect(response.body).to match(/Validation failed: Game can't be blank/)
    #   end
    # end
  end

  # Test suite for PUT /players/:player_id/games/:id
  describe 'PUT /players/:player_id/games/:id' do
    let(:valid_attributes) {  {computer_move: 3, player_move: 1, game_score: 1} }

    before { put "/players/#{player_id}/games/#{id}", params: valid_attributes }

    context 'when game exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the game' do
        updated_game = Game.find(id)
        expect(updated_game.game_score).to match(1)
      end
    end

    context 'when the game does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Game/)
      end
    end
  end

  # Test suite for DELETE /players/:id
  describe 'DELETE /players/:id' do
    before { delete "/players/#{player_id}/games/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
