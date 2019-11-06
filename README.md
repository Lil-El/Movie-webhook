# WebHook

## Step:

- 1.创建前后端的项目，并生成对应两个代码仓库
- 2.创建 webhook 项目，并生成代码仓库
  ```
    npm i nodemailer -S
  ```
- 3.配置后端项目仓库

  ```
  - 配置 Setting 的 webhook，设置 url 为：http://IP:4000/webhook
  - 在服务器生成ssh公钥：提交代码不需要输入密码
  - ssh-keygen -t rsa -b 4096 -C "yxd99324@qq.com"
  - 添加到github的账户的ssh中（不是项目中）：SSH and GPG keys的New SSH Key
  - 复制后端仓库的git的ssh地址，克隆到服务器中
  ```

- 4.配置前端：克隆前端代码,配置 webhook，同上
- 5.安装 nvm，node，npm，docker
