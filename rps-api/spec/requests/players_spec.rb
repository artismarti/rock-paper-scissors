# spec/requests/players_spec.rb
require 'rails_helper'

RSpec.describe 'Players API', type: :request do
  # initialize test data
  let!(:players) { create_list(:player, 10) }
  let(:player_id) { players.first.id }

  # Test suite for GET /players
  describe 'GET /players' do
    # make HTTP get request before each example
    before { get '/players' }

    it 'returns players' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /players/:id
  describe 'GET /players/:id' do
    before { get "/players/#{player_id}" }

    context 'when the record exists' do
      it 'returns the player' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(player_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:player_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Player/)
      end
    end
  end

  # Test suite for POST /players
  describe 'POST /players' do
    # valid payload
    let(:valid_attributes) { { username: 'artismarti'} }

    context 'when the request is valid' do
      before { post '/players', params: valid_attributes }

      it 'creates a player' do
        expect(json['username']).to eq('artismarti')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/players', params: { usernsame: 'artismarti' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end
    end
  end

  # Test suite for PUT /players/:id
  describe 'PUT /players/:id' do
    let(:valid_attributes) { { username: 'fridakahlo' } }

    context 'when the record exists' do
      before { put "/players/#{player_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /players/:id
  describe 'DELETE /players/:id' do
    before { delete "/players/#{player_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
