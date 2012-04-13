class Admin::UsersController < Admin::AdminController
  
  def index
    
  end
  
  def new
    @user = User.new  
  end
  
  def create
    @user = User.new
    @user.first_name = params[:first_name]
    @user.last_name = params[:last_name]
    @user.save
    
    @user.login_id = sprintf( "%03d", @user.id ) + rand.to_s.gsub( '.', '' ).slice( 0, 3 )
    if @user.save
      redirect_to :action => :index
    else
      render :action => :new
    end        
  end
    
  def destroy
    @user = User.find( params[:id] )
    @user.destroy
    
    redirect_to :action => :index
  end
  
end