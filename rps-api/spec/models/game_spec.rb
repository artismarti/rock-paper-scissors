require 'rails_helper'

RSpec.describe Game, type: :model do
  # Association test
  # ensure a game record belongs to a single player record
  it { should belong_to(:player) }
end
