FactoryBot.define do
  factory :game do
    computer_move { rand(1..3) }
    player_move { rand(1..3) }
    game_score { rand(0..1) }
    player_id { nil }
  end
end
