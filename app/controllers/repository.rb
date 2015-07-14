Ghcharts::App.controllers :repository do
  get :activity, :map => '/:org/:repo/activity' do
    @org = params[:org]
    @repo = params[:repo]
    render 'activity'
  end

  get :activity_json, :map => '/:org/:repo/activity/json', :provides => :json do
    org = params[:org]
    repo = params[:repo]
    name = "#{org}/#{repo}"
    repository = Repository.where(name: name).first
    unless repository
      # TODO body を定義する
      error(404)
    end
    start = (Time.now.to_date << 3).to_time # 1ヶ月前
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
end
