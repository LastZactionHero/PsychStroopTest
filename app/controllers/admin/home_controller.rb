class Admin::HomeController < Admin::AdminController
  
  def index
    
  end
   
  def toggle_novel_administration
    TestMeta.toggle_novel_administration
    redirect_to :action => :index  
  end
  
end