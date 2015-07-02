Ghcharts::App.controllers :stats do
  get :json, :map => '/:org/:repo/stats/json', :provides => :json do
    org = params[:org]
    repo = params[:repo]
    path = Padrino.root(Config[:token])
    token = File.read(path)
    client = Octokit::Client.new(:access_token => token)
    stats = client.contributors_stats("#{org}/#{repo}")
    stats.map{|s|
      total = s[:total]
      weeks = s[:weeks]
      author = s[:author]
      {
        :author => author[:login],
        :weeks => weeks.map{|w|
          {
            :w => w[:w],
            :a => w[:a],
            :d => w[:d],
            :c => w[:c],
          }
        }
      }
    }.to_json
  end
end
