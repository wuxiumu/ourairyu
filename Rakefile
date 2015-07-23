require "time"
require "pathname"

desc "运行 Jekyll"
task :jekyll_run do
  host = ENV["host"] || "0.0.0.0"
  port = ENV["port"] || "4000"

  # 编译前端资源文件
  puts "\r\n\r\n\r\n"
  puts "Compiling assets..."
  puts "\r\n\r\n"
  system "grunt"

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
  system "rake jekyll_build dest=../#{repo}"
  system "rake push_github repo=#{repo}"

  puts "\r\n\r\n"
  puts "#{repo} has already deployed. ;-)"
end
