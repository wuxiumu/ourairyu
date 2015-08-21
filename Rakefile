require "time"

desc "部署"
task :deploy do
  cd "../temp/site_github" do
    system "git pull"
  end

  system "bundle exec jekyll build -d ../temp/site_github --config _config.yml,_build/config.yml"

  cd "../temp/site_github" do
    system "touch .nojekyll"
    system "git add -A"
    system "git commit -m '部署于 #{Time.now.utc}'"
    system "git push"
  end
end
