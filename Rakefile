require "date"
require "time"
require "httparty"
require "json"

desc "获取并过滤掉不需要包含的 repo 信息"
task :github do
  dir = "./_data"
  filename = "github.json"

  unless FileTest.directory?(dir)
    system "mkdir #{dir}"
  end

  repos = Array.new
  pagenum = 1

  while true do
    jsonData = HTTParty.get("https://api.github.com/users/ourai/repos?per_page=100&page=#{pagenum}")

    if jsonData.length == 0
      break
    end

    repos.concat(jsonData)
    pagenum += 1
  end

  excludedRepos = [
    # 19068698,   # ourai.github.io
    # 28067674,   # ourairyu-themes
    # 48522689    # wantu-nodejsSDK
  ]

  cd dir do
    filtered_repos = Array.new
    starred_repos = Array.new

    repos.each do |r|
      # 过滤掉私有的、fork 的、被指定排除的和没有语言属性的 repo
      unless r["private"] == true || r["fork"] == true || excludedRepos.include?(r["id"]) || r["language"].nil?
        filtered_repos.push(r)

        # 被 star 的 repo
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

desc "生成 GitBook 电子书"
task :gitbook do
  name = "frontend-engineer-manual"
  dir = "../../f2eso/#{name}"

  cd dir do
    system "gitbook build"
  end

  deploy_dir = "../.tmp/ourairyu/books"

  system "rm -rf #{deploy_dir}/#{name}"
  system "cp -R #{dir}/_book/ #{deploy_dir}/#{name}/"
end

desc "运行"
task :run do
  system "bundle exec jekyll serve --future --drafts --incremental --port 10222"
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
      system "git remote add origin git@gitlab.com:ourairyu/ourairyu.git"
      system "git fetch"
      system "git checkout site"
    end
  else
    cd dir do
      # system "git reset --hard HEAD"
      system "git pull origin site"
    end
  end

  system "rake github"

  system "bundle exec jekyll clean"
  system "JEKYLL_ENV=production bundle exec jekyll build -d #{dir}"
  
  system "rake gitbook"

  cd dir do
    current_time = Time.now.strftime("%Y-%m-%d %H:%M:%S")

    system "touch .nojekyll"
    system "git add -A"
    system "git commit -m 'Generate on #{current_time}'"
    system "git push origin site"
  end
end
