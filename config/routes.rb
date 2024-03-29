Stroop::Application.routes.draw do
  
  namespace :admin do
    root :to => "home#index"
        
    resources :home, :only => [] do
      collection do
        get 'toggle_novel_administration'
      end
    end
    
    match 'sign_in' => "admin#sign_in"
    match 'complete_sign_in' => "admin#complete_sign_in"
    match 'sign_out'  => "admin#sign_out"    
    
    resources :users
    
    resources :trials, :only => [ :index ] do
      collection do
        get 'delete_all'
        get 'user'
        get 'sessions'
        get 'sessions_csv'
        get 'stress_gen'
        get 'user_total_avg'
      end
    end
    
  end
  
  root :to => 'study#home'
  resources :study, :only => [] do
    collection do
      get 'home'
      post 'sign_in'
      get 'instructions'
      get 'fingers'
      get 'full_screen_warning'
      get 'test'
    end
  end
  
  resources :trials, :only => [ :create ]
    
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
