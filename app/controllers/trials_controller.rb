class TrialsController < ApplicationController
  
  def create
    user_id = params["user_id"].to_i
      
    params["results"].keys.each do |key|
            
      result = params["results"][key]
        
      trial = Trial.new
      trial.user_id = user_id
      trial.text_color = result["textColor"]
      trial.ink_color = result["inkColor"]
      trial.condition = result["type"]
      trial.mode = result["mode"]
      trial.answer_color = result["answeredColor"]
      trial.correct = result["correct"]
      trial.response_time = result["responseTime"].to_i
      trial.note = result["note"]
      trial.save      
    end
        
    #{"results"=>{"0"=>{"textColor"=>"RED", "inkColor"=>"BLUE", "type"=>"incongruent", "sortVar"=>"0.03928139922209084", "mode"=>"practice", "answeredColor"=>"GREEN", "correct"=>"false", "responseTime"=>"683", "note"=>"null"}
    render :json => { :success => 0 }
  end
  
end