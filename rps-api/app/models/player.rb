class Player < ApplicationRecord
  has_many :games, dependent: :destroy
  accepts_nested_attributes_for :games, allow_destroy: true
  validates_presence_of :username
end
