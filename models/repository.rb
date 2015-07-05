class Repository
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :name, type: String
  has_many :activities
end
