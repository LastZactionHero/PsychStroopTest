class Trial < ActiveRecord::Base
  belongs_to :user
  
  def self.last_session
    Trial.last ? Trial.last["session"] : -1
  end
  
  def self.timestamp_by_session( session )
    zone = ActiveSupport::TimeZone.new( "Eastern Time (US & Canada)" )    
    time = Trial.where( :session => session ).first.created_at.in_time_zone( zone )
    
    period = time.hour > 12 ? "Afternoon" : "Morning"    
    time.strftime( "%A" ) + " " + period + ", " + time.strftime( "%H:%M, %m/%d/%Y")    
  end
  
  def timestamp
    Trial.timestamp_by_session( self.session )  
  end
  
end
