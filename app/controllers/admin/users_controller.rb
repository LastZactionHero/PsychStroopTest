class Admin::UsersController < Admin::AdminController
  
  def index
    
  end
  
  def new
    @user = User.new  
  end
  
  def create
    @user = User.new
    @user.id_hash = Digest::SHA1.hexdigest params[:email]
    if @user.save
      redirect_to :action => :index
    else
      render :action => :new
    end        
  end
  
end