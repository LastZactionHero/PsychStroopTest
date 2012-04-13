class Admin::TrialsController < Admin::AdminController
  
  def index    
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
  
  def stress_gen
    session = Trial.last_session + 1
    
    Trial.all.each do |trial|
      (session..1680).each do |session|
        Rails.logger.warn "Session: #{session}"
        new_trial = Trial.new      
        new_trial.user_id = trial.user_id
        new_trial.trial_num = trial.trial_num 
        new_trial.text_color = trial.text_color 
        new_trial.ink_color = trial.ink_color 
        new_trial.combination = trial.combination 
        new_trial.mode = trial.mode 
        new_trial.answer_color = trial.answer_color 
        new_trial.correct = trial.correct 
        new_trial.response_time = trial.response_time 
        new_trial.note = trial.note 
        new_trial.session = session
        new_trial.save     
      end
    end  
  end
  
end