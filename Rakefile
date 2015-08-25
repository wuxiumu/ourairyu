require "date"
require "time"
require "httparty"
require "json"

desc "获取并过滤掉不需要包含的 repo 信息"
task :projects do
  filename = "github.json"

  # 开始获取并写入 repo 信息
  cd "./_data" do
    open(filename, "w") do |f|
      f.puts HTTParty.get("https://api.github.com/users/ourai/repos").to_json
    end
  end

  excludedRepos = [
    18552598,   # bakufu
    35932564,   # learning
    19068698,   # ourai.github.io
    39746025,   # profile
    35203272,   # ourai.ws
    28067674,   # ourairyu-themes
    23340879,   # waken
    23698214,   # domshim
    38699113,   # double-list
    39214016    # CustomComponent
  ]

  cd "./_data" do
    repos = JSON.parse(File.read(filename))
    filtered_repos = Array.new
    starred_repos = Array.new

    repos.each do |r|
      unless r["private"] == true || r["fork"] == true || excludedRepos.include?(r["id"])
        filtered_repos.push(r)

        unless r["stargazers_count"] == 0
          starred_repos.push(r)
        end
      end
    end

    # 按照 star 人数、更新日期对 repo 进行排序
    filtered_repos.sort! do |a, b|
      if a["stargazers_count"] == b["stargazers_count"]
        DateTime.parse(a["updated_at"]).to_time.to_i <=> DateTime.parse(b["updated_at"]).to_time.to_i
      else
        a["stargazers_count"] <=> b["stargazers_count"]
      end
    end
    
    starred_repos.sort! do |a, b|
      if a["stargazers_count"] == b["stargazers_count"]
        DateTime.parse(a["updated_at"]).to_time.to_i <=> DateTime.parse(b["updated_at"]).to_time.to_i
      else
        a["stargazers_count"] <=> b["stargazers_count"]
      end
    end

    open(filename, "w") do |f|
      f.puts Hash["all" => filtered_repos.reverse, "starred" => starred_repos.reverse].to_json
    end
  end
end

desc "部署"
task :deploy do
  cd "../temp/site_github" do
    # system "git reset --hard HEAD"
    system "git pull origin gh-pages"
  end

  system "bundle exec jekyll build -d ../temp/site_github --config _config.yml,_build/config.yml"

  cd "../temp/site_github" do
    system "touch .nojekyll"
    system "git add -A"
    system "git commit -m '部署于 #{Time.now.utc}'"
    system "git push origin gh-pages"
  end
end
