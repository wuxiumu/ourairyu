require "date"
require "time"
require "httparty"
require "json"

# 打印带有换行符的信息
# 主要用于一个 task 的开始
def print_msg( msg )
  puts msg
  puts
end

namespace :ourai do
  desc "运行 Jekyll"
  task :run do
    host = ENV["host"] || "0.0.0.0"
    port = ENV["port"] || "4000"

    # 编译前端资源文件
    puts "开始编译静态资源"
    system "grunt"
    print_msg "静态资源编译完毕"

    system "rake ourai:filter"

    # 启动 Jekyll
    puts "启动 Jekyll 服务器"
    system "bundle exec jekyll serve -H #{host} -P #{port}"
    print_msg "Jekyll 服务器已经启动"
  end

  desc "将网站文件生成到其他文件夹中"
  task :build do
    dir = ENV["dir"] || "ourai.github.io"
    dest = "../#{dir}"

    puts "开始生成网页到 #{dest} 文件夹中"
    system "bundle exec jekyll build -d #{dest}"
    print_msg "网页已经生成完毕"
  end

  desc "从 GitHub 获取 repo 信息"
  task :repos do
    username = ENV["username"] || "ourai"

    puts "开始获取并写入 #{username} 的 repo 信息"
    cd "./_data/projects" do
      open("github.json", "w") do |f|
        f.puts HTTParty.get("https://api.github.com/users/#{username}/repos").to_json
      end
    end
    print_msg "repo 信息获取并写入完毕"
  end

  desc "过滤掉不需要包含的 repo 信息"
  task :filter do
    system "rake ourai:repos username=ourai"

    excludedRepos = [
      18552598,   # bakufu
      35932564,   # learning
      19068698,   # ourai.github.io
      39746025,   # profile
      35203272,   # ourai.ws
      28067674,   # ourairyu-themes
      19260834,   # ourairyu.github.io
      23340879,   # waken
      16250547,   # novel
      23698214,   # domshim
      38699113,   # double-list
      18203491,   # ninja
      39214016    # CustomComponent
    ]

    cd "./_data/projects" do
      filename = "github.json"
      repos = JSON.parse(File.read(filename))
      filtered_repos = Array.new

      puts "开始过滤 repo 数据"
      repos.each do |r|
        unless r["private"] == true || r["fork"] == true || excludedRepos.include?(r["id"])
          filtered_repos.push(r)
        end
      end
      print_msg "过滤 repo 数据完毕"

      puts "开始对 repo 数据进行排序"
      # 按照 star 人数、更新日期对 repo 进行排序
      filtered_repos.sort! do |a, b|
        if a["stargazers_count"] == b["stargazers_count"]
          DateTime.parse(a["updated_at"]).to_time.to_i <=> DateTime.parse(b["updated_at"]).to_time.to_i
        else
          a["stargazers_count"] <=> b["stargazers_count"]
        end
      end
      print_msg "repo 数据排序完毕"

      puts "开始保存过滤后的 repo 数据"
      open(filename, "w") do |f|
        f.puts filtered_repos.to_json
      end
      print_msg "保存 repo 数据完毕"
    end
  end

  desc "从 GitHub 获取代码"
  task :pull do
    dir = "../#{ENV["dir"]}"
    repo = ENV["repo"]
    url = "https://github.com/ourai/#{repo}"

    if repo == "ourai.github.io"
      branch = "master"
    else
      branch = "gh-pages"
    end

    unless FileTest.directory?(dir)
      system "mkdir #{dir}"

      puts "开始从 #{url} 拷贝代码"
      cd dir do
        system "git init"
        system "git remote add origin #{url}.git"
        system "git fetch"
        system "git checkout #{branch}"
      end
      print_msg "从 #{url} 拷贝代码完毕"
    else
      puts "开始同步 #{repo} 的数据"
      puts "目标分支 #{branch}"
      cd dir do
        # system "git reset --hard HEAD"
        system "git pull origin #{branch}"
      end
      print_msg "#{repo} 的数据同步完毕"
    end
  end

  desc "将代码推送到 GitHub 上"
  task :push do
    dir = ENV["dir"]
    repo = ENV["repo"]
    url = "https://github.com/ourai/#{repo}"

    if repo == "ourai.github.io"
      branch = "master"
    else
      branch = "gh-pages"
    end

    puts "正在向 #{url} #{branch} 推送代码..."
    cd "../#{dir}" do
      system "touch .nojekyll"
      system "git add -A"
      system "git commit -m 'Deployed at #{Time.now.utc}'"
      system "git push origin #{branch}"
    end
    print_msg "向 #{url} 推送代码完毕"
  end

  desc "将生成后的站点部署到 GitHub 上"
  task :deploy do
    repo = "ourai.github.io"
    dir = ".tmp/projects"

    unless FileTest.directory?("../.tmp")
      system "mkdir ../.tmp"
    end

    puts "开始部署 #{repo}"
    system "rake ourai:pull repo=#{repo} dir=#{dir}"
    system "rake ourai:filter"
    system "rake ourai:build dir=#{dir}"
    system "rake ourai:push repo=#{repo} dir=#{dir}"
    print_msg "#{repo} 已经部署完毕 ;-)"
  end
end
