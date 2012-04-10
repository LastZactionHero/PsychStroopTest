class Admin::TrialsController < Admin::AdminController
  
  def index
    @trials = Trial.all
  end
  
  def delete_all
    Trial.all.each do |trial|
      trial.destroy
    end
    
    redirect_to :action => :index
  end
  
end