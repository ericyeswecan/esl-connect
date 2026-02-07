@echo off
echo ========================================
echo ESL Connect - GitHub 배포 스크립트
echo ========================================
echo.

cd /d C:\Users\gthuy\eric260205\esl-connect

echo [1/4] Git 초기화 중...
git init
echo.

echo [2/4] 파일 추가 중...
git add .
echo.

echo [3/4] 첫 커밋 생성 중...
git commit -m "Initial commit - ESL Connect Platform"
echo.

echo ========================================
echo Git 초기화 완료!
echo ========================================
echo.
echo 다음 단계:
echo 1. GitHub에서 새 저장소 만들기: https://github.com/new
echo    - Repository name: esl-connect
echo    - Public 선택
echo    - Create repository 클릭
echo.
echo 2. 저장소 만든 후, GitHub 아이디를 입력하세요:
echo.
set /p username="GitHub 아이디: "
echo.

echo [4/4] GitHub에 푸시 중...
git remote add origin https://github.com/%username%/esl-connect.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo 배포 완료!
echo ========================================
echo.
echo 웹사이트 주소: https://%username%.github.io/esl-connect/
echo.
echo GitHub Settings - Pages에서 활성화하세요:
echo 1. 저장소 페이지에서 Settings 클릭
echo 2. 왼쪽 메뉴에서 Pages 클릭
echo 3. Branch: main 선택
echo 4. Save 클릭
echo.
pause
