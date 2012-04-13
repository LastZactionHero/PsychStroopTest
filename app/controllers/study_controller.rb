class StudyController < ApplicationController
  
  def home
    
  end
  
  def sign_in
    user = User.where( :login_id => params[:login_id] ).first
    
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
  
  def fingers
    
  end
  
  def full_screen_warning
    
  end
  
  def test
    @novel_administration = TestMeta.novel_administration?
    @user = User.where( :id => session[:user_id] ).first    
    redirect_to :action => :home unless @user    
  end
  
end