class User < ActiveRecord::Base
  validates_uniqueness_of :id_hash  
end