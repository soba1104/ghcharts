Ghcharts::App.controllers do
  
  get :index do
    path = Padrino.root(Config[:token])
    token = File.read(path)
    client = Octokit::Client.new(:access_token => token)
    stats = client.contributors_stats('soba1104/ghcharts')
    texts = []
    stats.each do |stat|
      total = stat[:total]
      weeks = stat[:weeks]
      author = stat[:author][:login]

      texts << "------ #{author} ------"
      texts << "total commits = #{total}"
      weeks.each do |w|
        t = Time.at(w[:w])
        a = w[:a]
        d = w[:d]
        c = w[:c]
        texts << "#{t}: #{c} commits, +#{a}, -#{d}"
      end
    end
    @text = texts.join("\n")
    render 'index/index'
  end

  # get :index, :map => '/foo/bar' do
  #   session[:foo] = 'bar'
  #   render 'index'
  # end

  # get :sample, :map => '/sample/url', :provides => [:any, :js] do
  #   case content_type
  #     when :js then ...
  #     else ...
  # end

  # get :foo, :with => :id do
  #   'Maps to url '/foo/#{params[:id]}''
  # end

  # get '/example' do
  #   'Hello world!'
  # end
  

end
