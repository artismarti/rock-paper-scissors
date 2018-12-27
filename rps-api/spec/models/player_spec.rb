require 'rails_helper'

RSpec.describe Player, type: :model do
  # Association test
  # ensure Player model has a 1:m relationship with the Game model
  it { should have_many(:games).dependent(:destroy) }
  # Validation tests
  # ensure username
  it { should validate_presence_of(:username) }
end
