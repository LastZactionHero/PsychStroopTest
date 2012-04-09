class StudyController < ApplicationController
  
  def home
    
  end
  
  def sign_in
    id_hash = Digest::SHA1.hexdigest params[:email]
    user = User.where( :id_hash => id_hash ).first
    
    if user
      session[:user_id] = user.id
      redirect_to :action => :instructions
    else
      @error = "This user was not found"
      render :action => :home
    end
    
  end
  
  def instructions
    
  end
  
  def full_screen_warning
    
  end
  
  def test
    
  end
  
end