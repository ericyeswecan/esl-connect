@echo off
echo ========================================
echo ESL Connect - GitHub 파일 업로드
echo ========================================
echo.

cd /d C:\Users\gthuy\eric260205\esl-connect

echo [1/5] Git 초기화...
git init
echo.

echo [2/5] 파일 추가...
git add .
echo.

echo [3/5] 커밋 생성...
git commit -m "Initial commit - ESL Connect Platform"
echo.

echo [4/5] GitHub 저장소 연결...
git remote add origin https://github.com/ericyeswecan/esl-connect.git
echo.

echo [5/5] 파일 업로드 중...
git branch -M main
git push -u origin main
echo.

echo ========================================
echo 완료!
echo ========================================
echo.
echo 웹사이트 주소: https://ericyeswecan.github.io/esl-connect/
echo.
echo 다음 단계:
echo 1. GitHub 저장소 페이지 열기: https://github.com/ericyeswecan/esl-connect
echo 2. Settings 클릭
echo 3. 왼쪽 메뉴에서 Pages 클릭
echo 4. Branch: main 선택, Save 클릭
echo.
pause
