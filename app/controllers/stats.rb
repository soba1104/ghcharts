Ghcharts::App.controllers :stats do
  get :index, :map => '/:org/:repo/stats' do
    @org = params[:org]
    @repo = params[:repo]
    render 'stats/index'
  end

  get :activity, :map => '/:org/:repo/stats/activity' do
    @org = params[:org]
    @repo = params[:repo]
    render 'stats/activity'
  end

  get :activity_json, :map => '/:org/:repo/stats/activity/json', :provides => :json do
    org = params[:org]
    repo = params[:repo]
    name = "#{org}/#{repo}"
    repository = Repository.where(name: name).first
    unless repository
      # TODO body を定義する
      error(404)
    end
    start = (Time.now.to_date << 1).to_time # 1ヶ月前
    activities = Activity.where(
      :repository => repository,
      :time.gte => start
    ).includes(:user)
    activities.map{|act|
      {
        repository: name,
        user: act.user.name,
        time: act.time.to_i,
        add: act.add,
        del: act.del,
        commit: act.commit,
      }
    }.to_json
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
