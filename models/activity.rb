class Activity
  include Mongoid::Document
  include Mongoid::Timestamps # adds created_at and updated_at fields

  field :time, :type => Time
  field :add, :type => Integer
  field :del, :type => Integer
  field :commit, :type => Integer
  belongs_to :user
  belongs_to :repository
end
