class Repository
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :name, type: String
  embeds_many :activities
end
