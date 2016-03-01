require "date"
require "time"
require "httparty"
require "json"

desc "获取并过滤掉不需要包含的 repo 信息"
task :projects do
  dir = "./_data"
  filename = "github.json"

  unless FileTest.directory?(dir)
    system "mkdir #{dir}"
  end

  # 开始获取并写入 repo 信息
  cd dir do
    open(filename, "w") do |f|
      f.puts HTTParty.get("https://api.github.com/users/ourai/repos").to_json
    end
  end

  excludedRepos = [
    19068698,   # ourai.github.io
    50164625,   # f2e-stuff
    28067674,   # ourairyu-themes
    35932564,   # learning-js
    50562537,   # learning-python
    50562418,   # learning-c
    23698214,   # domshim
    38699113,   # double-list
    18203491,   # ninja
    40175073,   # H5Fx-backbone
    45201820,   # WeBug
    43893848,   # jekyll-guru
    48522689,   # wantu-nodejsSDK
    39214016    # CustomComponent
  ]

  cd dir do
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

# https://github.com/natewiley/cpv2api (http://cpv2api.com)
desc "获取 CodePen 信息"
task :codepen do
  dir = "./_data"
  filename = "codepen.json"

  unless FileTest.directory?(dir)
    system "mkdir #{dir}"
  end

  jsonData = HTTParty.get("http://cpv2api.com/pens/public/ourai")

  if jsonData["success"] == "true"
    cd dir do
      open(filename, "w") do |f|
        f.puts jsonData["data"].to_json
      end
    end
  end
end

desc "运行"
task :run do
  system "bundle exec jekyll serve --incremental"
end

desc "部署"
task :deploy do
  dir = "../.tmp/ourairyu"

  unless FileTest.directory?("../.tmp")
    system "mkdir ../.tmp"
  end

  unless FileTest.directory?(dir)
    system "mkdir #{dir}"

    cd dir do
      system "git init"
      system "git remote add origin https://github.com/ourai/ourai.github.io.git"
      system "git fetch"
      system "git checkout master"
    end
  else
    cd dir do
      # system "git reset --hard HEAD"
      system "git pull origin master"
    end
  end

  system "rake projects"
  system "rake codepen"
  system "JEKYLL_ENV=production bundle exec jekyll build -d #{dir}"

  cd dir do
    current_time = Time.now.strftime("%Y-%m-%d %H:%M:%S")

    system "touch .nojekyll"
    system "git add -A"
    system "git commit -m 'Deploy on #{current_time}'"
    system "git push origin master"
  end
end
