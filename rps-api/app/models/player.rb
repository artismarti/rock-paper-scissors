class Player < ApplicationRecord
  has_many :games, dependent: :destroy
  validates_presence_of :username
end
