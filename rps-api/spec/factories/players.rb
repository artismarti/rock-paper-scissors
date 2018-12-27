FactoryBot.define do
  factory :player do
    username {Faker::Internet.username(5..10)}
  end
end
