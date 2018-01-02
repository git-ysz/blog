#!/bin/bash
set -ev
git clone https://${GH_REF} .deploy_git
cd .deploy_git
git checkout master
cd ../
mv .deploy_git/.git/ ./public/
cd ./public
git config user.name  "git-ysz" # ����ĳ��Լ��� Github �û���
git config user.email "976776565@qq.com" # ����ĳ��Լ��� Github ����
# add commit timestamp
git add . 
git commit -m "Travis CI Auto Builder at `date +"%Y-%m-%d %H:%M"`"
git push --force --quiet "https://${api}@${GH_REF}" master:master # github_token �ĳ����� Travis CI ����ӵĻ�����������