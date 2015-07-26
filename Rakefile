require "time"
require "pathname"
require "httparty"
require "json"

desc "运行 Jekyll"
task :jekyll_run do
  host = ENV["host"] || "0.0.0.0"
  port = ENV["port"] || "4000"

  # 编译前端资源文件
  puts "\r\n\r\n\r\n"
  puts "Compiling assets..."
  puts "\r\n\r\n"
  system "grunt"

  system "rake filter_repos"

  # 启动 Jekyll
  puts "\r\n\r\n\r\n"
  puts "Start Jekyll server"
  puts "\r\n\r\n"
  system "bundle exec jekyll serve -H #{host} -P #{port}"
end

desc "将网站文件构建到其他文件夹中"
task :jekyll_build do
  dest = ENV["dest"] || "../ourai.github.io"

  puts "Build site to #{dest}"
  system "bundle exec jekyll build -d #{dest}"
end

desc "从 GitHub 获取 repo 信息"
task :repos do
  username = ENV["username"] || "ourai"

  cd "./_data/projects" do
    puts "正在获取并写入 #{username} 的 repo 信息"

    open("github.json", "w") do |f|
      f.puts HTTParty.get("https://api.github.com/users/#{username}/repos").to_json
    end

    puts "repo 信息获取并写入完毕"
  end
end

desc "过滤掉不需要包含的 repo 信息"
task :filter_repos do
  system "rake repos username=ourai"

  excludedRepos = [
    18552598,   # bakufu
    35932564,   # learning
    19068698,   # ourai.github.io
    39543273,   # development
    39746025,   # profile
    35203272,   # ourairyu
    28067674,   # ourairyu-themes
    23340879,   # waken
    23698214,   # domshim
    38699113,   # double-list
    39214016    # CustomComponent
  ]

  cd "./_data/projects" do
    filename = "github.json"
    repos = JSON.parse(File.read(filename))
    filtered_repos = Array.new

    puts "正在过滤 repo"

    repos.each do |r|
      unless excludedRepos.include?(r["id"])
        filtered_repos.push(r)
      end
    end

    puts "过滤 repo 完毕"

    puts "正在保存过滤后的 repo 数据"

    open(filename, "w") do |f|
      f.puts filtered_repos.to_json
    end

    puts "保存 repo 数据完毕"
  end
end

desc "从 GitHub 获取代码"
task :pull_github do
  repo = ENV["repo"]
  url = "https://github.com/ourai/#{repo}"

  unless FileTest.directory?("../#{repo}")
    puts "Clone code from #{url}"
    cd ".." do
      system "git clone #{url}.git"
    end
  else
    cd "../#{repo}" do
      puts "Update #{repo}"
      # system "git reset --hard HEAD"
      system "git pull origin master"
    end
  end
end

desc "将代码推送到 GitHub 上"
task :push_github do
  repo = ENV["repo"]
  url = "https://github.com/ourai/#{repo}"

  cd "../#{repo}" do
    system "touch .nojekyll"

    puts "Pushing to #{url}..."
    system "git add -A"
    system "git commit -m 'Updated at #{Time.now.utc}'"
    system "git push origin master"
  end
end

desc "将构建后的站点部署到 GitHub 上"
task :deploy do
  repo = ENV["repo"] || "ourai.github.io"

  system "rake pull_github repo=#{repo}"
  system "rake filter_repos"
  system "rake jekyll_build dest=../#{repo}"
  system "rake push_github repo=#{repo}"

  puts "\r\n\r\n"
  puts "#{repo} has already deployed. ;-)"
end
