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
  
  def user
    @user = User.find( params[:user_id] )      
    @sessions = Trial.where( :user_id => @user.id ).order( "created_at ASC" ).map{ |t| t.session }.uniq
  end
  
  def sessions
    @user = User.find( params[:user_id] )
    @trials = Trial.where( :session => params[:session] ).order( "mode ASC, combination ASC, trial_num ASC" )
      
    @congruent_avg = 0
    @congruent_count = 0
    @incongruent_avg = 0
    @incongruent_count = 0
    
    @trials.each do |trial|
      if trial.mode == 'real' and trial.correct == true and trial.combination == 'congruent'
        @congruent_avg += trial.response_time
        @congruent_count += 1
      elsif trial.mode == 'real' and trial.correct == true and trial.combination == 'incongruent'
        @incongruent_avg += trial.response_time
        @incongruent_count += 1
      end  
    end
    
    @congruent_avg =  @congruent_count > 0 ? ( @congruent_avg.to_f / @congruent_count.to_f ).to_i : 0
    @incongruent_avg = @incongruent_count > 0 ? ( @incongruent_avg.to_f / @incongruent_count.to_f ).to_i : 0
  end
  
  def sessions_csv
    @user = User.find( params[:user_id] )
    @trials = Trial.where( :session => params[:session] ).order( "mode ASC, combination ASC, trial_num ASC" )
      
    @congruent_avg = 0
    @congruent_count = 0
    @incongruent_avg = 0
    @incongruent_count = 0
    
    @trials.each do |trial|
      if trial.mode == 'real' and trial.correct == true and trial.combination == 'congruent'
        @congruent_avg += trial.response_time
        @congruent_count += 1
      elsif trial.mode == 'real' and trial.correct == true and trial.combination == 'incongruent'
        @incongruent_avg += trial.response_time
        @incongruent_count += 1
      end  
    end
    
    @congruent_avg =  @congruent_count > 0 ? ( @congruent_avg.to_f / @congruent_count.to_f ).to_i : 0
    @incongruent_avg = @incongruent_count > 0 ? ( @incongruent_avg.to_f / @incongruent_count.to_f ).to_i : 0    
    render 'sessions_csv.text.erb'
  end
  
end