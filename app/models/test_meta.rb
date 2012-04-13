class TestMeta < ActiveRecord::Base
  
  def self.novel_administration? 
    meta = TestMeta.get_instance
    meta.novel_administration
  end

  def self.toggle_novel_administration
    meta = TestMeta.get_instance
    meta.novel_administration = !meta.novel_administration
    meta.save
  end
  
  private
  
  def self.get_instance
    meta = TestMeta.first
    if meta == nil
      meta = TestMeta.new
      meta.novel_administration = false
      meta.save
    end
    meta  
  end
  
end
