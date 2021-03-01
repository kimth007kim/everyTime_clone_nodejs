# 에브리타임 클론코딩 프로젝트

## 프로젝트 개요
- Node.js 프로그래밍 3판 - 윤인성 저자님의 책을 보고 미니 프로젝트를 진행하고자했습니다. Node.js를 사용해서 대표적으로 만들수 있는 것은 게시판인데 그래서 지금 대학생들이 아마도 가장 많이 이용하는 에브리타임 홈페이지를 클론코딩하고 CRUD 기능을 추가하는것을 목표로 했습니다.



## 사용언어 및 도구(툴)
![html_original_wordmark_logo_icon_146478](https://user-images.githubusercontent.com/48907339/101194205-049d8a00-36a1-11eb-8fa9-498a9603d45b.png)
![css_original_wordmark_logo_icon_146576](https://user-images.githubusercontent.com/48907339/101194211-06ffe400-36a1-11eb-8615-0a3d352bd73c.png)![file_type_pug_icon_130225](https://user-images.githubusercontent.com/48907339/101274975-9f9f7c80-37e5-11eb-900b-155cf441c721.png)
![file_type_js_official_icon_130509](https://user-images.githubusercontent.com/48907339/101194729-b6d55180-36a1-11eb-88b0-f3c91df05e55.png)![express_original_wordmark_logo_icon_146528](https://user-images.githubusercontent.com/48907339/101193677-4a0d8780-36a0-11eb-8abd-4704056f4f48.png)![nodejs_plain_wordmark_logo_icon_146410](https://user-images.githubusercontent.com/48907339/101194757-c05eb980-36a1-11eb-8f4e-0c571ab197f0.png)![file_type_vscode_icon_130084](https://user-images.githubusercontent.com/48907339/101195939-770f6980-36a3-11eb-9056-6369e19696ff.png)![mysql_plain_wordmark_logo_icon_146415 (4)](https://user-images.githubusercontent.com/48907339/101274991-bc3bb480-37e5-11eb-8817-91d93497d7de.png)

### 개발
- express 템플릿인 pug를 이용해서 프론트 엔드단을 구현하였습니다.
- Node.js와 express를 이용해서 백엔드를 구현하였습니다.
- Mysql을 이용해서 DB와 CRUD를 구현하였습니다.

## 구현화면
## `#1 메인화면`

## `#1 로그인 하기전 메인화면`
![에타메인](https://user-images.githubusercontent.com/48907339/101275190-0ec9a080-37e7-11eb-84a9-f56e82f0bb3f.PNG)

- 처음으로 접속했을때의 메인화면으로 총 8개의 게시판의 글중에서 최근에 작성된 4개의 글을 화면에 표시하였습니다.

## `#1 로그인 후 메인화면`
![로그인 후 화면](https://user-images.githubusercontent.com/48907339/109459711-b1ba4f80-7aa2-11eb-8499-ba273ef9bae3.PNG)

- 로그인 후 메인화면입니다. 로그인 버튼들이 사라지고 로그아웃 버튼으로 대체하였습니다.

## `#2 글 작성 기능(CREATE)`
![글작성 기능](https://user-images.githubusercontent.com/48907339/102180905-f6dfd400-3eec-11eb-9edc-5c2f93585f9a.PNG)

- 각각의 게시판에들어가서 글을 작성할 수있는 기능입니다.

## `#2-1 글 보기 기능(READ)`
![에타게시판목록](https://user-images.githubusercontent.com/48907339/101275194-10936400-37e7-11eb-94c7-ed8d4afc191b.PNG)

-  특정 게시판 모든 글 목록을 나타내는 화면입니다.  아래의 DB를 연동하였으며 , 최근올라온 글 순서대로 표시하도록 하였습니다.

## `#2-2 DB`
![에타메인DB](https://user-images.githubusercontent.com/48907339/101275192-0ffacd80-37e7-11eb-8f7a-00e216fa5458.PNG)

- mysql에 게시글을 모두 등록되어있는 모습이며, 페이지와도 연동이된 모습입니다.

## `#2-3 특정 글 보기`
![에타 특정글](https://user-images.githubusercontent.com/48907339/102180747-b97b4680-3eec-11eb-8817-258e2fc4961a.PNG)

- 게시글을 클릭하였을때 그 글의 내용을 볼수있는 기능입니다. 추가적으로 수정과 삭제버튼을 눌러서 게시글을 수정 및 삭제가 가능합니다. (댓글기능은 구현예정)

## `#3 글 수정 및 삭제 기능`

- 다른 유저가 글 조회했을때 글을 수정이나 삭제버튼이 비활성화 됩니다.

![다른유저가수정요청](https://user-images.githubusercontent.com/48907339/109459150-9438b600-7aa1-11eb-8686-8b7fe4e09e5d.PNG)

- 글을 작성한 유저가 글 조회했을때 글을 수정이나 삭제버튼이 활성화 됩니다.

![글쓴이가 글을 수정하려할때](https://user-images.githubusercontent.com/48907339/109459151-96027980-7aa1-11eb-827c-c8f95080e868.PNG)

## `#3-1 글 수정 기능 (UPDATE)`
![에타 글수정](https://user-images.githubusercontent.com/48907339/102180750-baac7380-3eec-11eb-81b8-1bc0ddf29772.PNG)

- 게시글 수정 버튼을 눌렀을때 나오는 화면입니다. 게시글을 수정할수 있습니다.

## `#3-2 글 삭제 기능 (DELETE)`
![에타 글삭제](https://user-images.githubusercontent.com/48907339/102180753-baac7380-3eec-11eb-8932-c6f718e83897.PNG)

- 게시글 삭제 버튼을 눌렀을때 수행하는 javascript문입니다. 게시글을 삭제할 수 있습니다.






## 참가자 명단 및 담당파트
- 1인 프로젝트


