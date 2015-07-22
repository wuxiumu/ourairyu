require "time"
require "pathname"

# 运行 Jekyll
# rake jekyll host=localhost port=4000
desc "Run Jekyll server"
task :jekyll do
  host = ENV["host"] || "0.0.0.0"
  port = ENV["port"] || "4000"

  puts "\r\n\r\n\r\nStart Jekyll server\r\n\r\n"
  system "bundle exec jekyll serve -H #{host} -P #{port}"
end

desc "push to github but must develop branch"
task :deploy do
  repo = "ourai.github.io"

  unless FileTest.directory?("../#{repo}")
    puts "clone #{repo} from GitHub"
    cd '..' do
      system "git clone git@github.com:ourai/#{repo}.git"
    end
  else
    cd "../#{repo}" do
      puts "update #{repo} repo"
      # system "git reset --hard HEAD"
      system "git pull origin master"
    end
  end
  # puts "Pushing to 'master' branch:"
  # system "git push origin master"
  # puts "'master' branch updated."
  puts "Building site..."
  # system "bundle exec jekyll build --config _config.yml,_production_config.yml"
  puts "Site updated."
  puts "create '.ourai_temp' directory"
  system "mkdir ../.ourai_temp"
  system "mv ../#{repo}/.git ../.ourai_temp/.git"
  system "mv ../#{repo}/.gitignore ../.ourai_temp/.gitignore"
  system "rm -rf ../#{repo}/*"
  system "mv ../.ourai_temp/.git ../#{repo}/.git"
  system "mv ../.ourai_temp/.gitignore ../#{repo}/.gitignore"
  system "rm -rf ../.ourai_temp"
  puts "remove '.ourai_temp' directory"
  puts "update #{repo} dir"
  system "cp -r ./_site/* ../#{repo}"
  system "cp ./CNAME ../#{repo}"
  system "cp ./README.md ../#{repo}"
  puts "copied site to #{repo}"
  puts
  cd "../#{repo}" do
#    remove_list = ["Rakefile",".ruby-version","Gemfile","Gemfile.lock","readme.md"]
#    remove_list.each do |rf|
#      if FileTest.exist?(rf)
#        puts "remove #{rf}"
#        system "rm #{rf}"
#      end
#    end
    puts "add .nojekyll"
    system "touch .nojekyll"
    puts "Pushing to 'master' branch:"
    system "git add -A"
    system "git commit -m 'Updated at #{Time.now.utc}'"
    system "git push origin master"
    puts "'master' branch updated."
  end
end
