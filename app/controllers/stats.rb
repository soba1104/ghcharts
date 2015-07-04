Ghcharts::App.controllers :stats do
  get :index, :map => '/:org/:repo/stats' do
    @org = params[:org]
    @repo = params[:repo]
    render 'stats/index'
  end

  get :json, :map => '/:org/:repo/stats/json', :provides => :json do
    org = params[:org]
    repo = params[:repo]
    path = Padrino.root(Config[:token])
    token = File.read(path)
    client = Octokit::Client.new(:access_token => token)
    stats = client.contributors_stats("#{org}/#{repo}")
    {
      :repository => "#{org}/#{repo}",
      :activities => stats.map{|s|
        total = s[:total]
        weeks = s[:weeks]
        author = s[:author]
        {
          :author => author[:login],
          :activity => weeks.map{|w|
            {
              :w => w[:w],
              :a => w[:a],
              :d => w[:d],
              :c => w[:c],
            }
          }
        }
      }
    }.to_json
  end
end
