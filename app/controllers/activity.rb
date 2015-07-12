Ghcharts::App.controllers :activity do
  get :index do
    @repositories = Repository.all()
    render 'index'
  end
end
