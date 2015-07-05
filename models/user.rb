class User
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :name
  has_many :activities, dependent: :destroy
  index({name: 1}, { unique: true })
  validates_uniqueness_of :name
end
