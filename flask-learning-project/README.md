# Flask Learning Project

这是一个用于学习 Flask 框架的项目，同时也是复习 Python 重要知识点的实践项目。

## 项目结构

```
flask-learning-project/
├── app/
│   ├── blueprints/        # 蓝图（模块化路由）
│   │   ├── auth.py        # 认证相关路由
│   │   ├── main.py        # 主页面路由
│   │   └── blog.py        # 博客相关路由
│   ├── config/            # 配置文件
│   │   └── config.py      # 应用配置
│   ├── forms/             # 表单
│   │   ├── auth.py        # 认证表单
│   │   └── post.py        # 博客文章表单
│   ├── models/            # 数据模型
│   │   ├── user.py        # 用户模型
│   │   └── post.py        # 博客文章模型
│   ├── static/            # 静态文件
│   │   └── css/           # CSS 文件
│   │       └── main.css   # 主样式文件
│   ├── templates/         # 模板文件
│   │   ├── auth/          # 认证相关模板
│   │   │   ├── login.html # 登录页面
│   │   │   └── register.html # 注册页面
│   │   ├── blog/          # 博客相关模板
│   │   │   ├── create_post.html # 创建/更新文章页面
│   │   │   └── post.html  # 文章详情页面
│   │   ├── main/          # 主页面模板
│   │   │   ├── home.html  # 首页
│   │   │   └── about.html # 关于页面
│   │   └── base.html      # 基础模板
│   ├── utils/             # 工具函数
│   └── __init__.py        # 应用初始化
├── .env                   # 环境变量
├── requirements.txt       # 依赖包
├── run.py                 # 应用启动文件
└── README.md              # 项目说明
```

## 功能特点

- **用户认证**：注册、登录、登出功能
- **博客管理**：创建、查看、更新、删除博客文章
- **数据库集成**：使用 SQLAlchemy ORM 操作数据库
- **表单处理**：使用 Flask-WTF 处理表单数据
- **蓝图组织**：模块化路由管理
- **模板继承**：使用 Jinja2 模板引擎实现模板继承
- **静态文件管理**：CSS 样式定制

## 技术栈

- **后端**：Python 3.9+, Flask 2.0.1
- **数据库**：SQLite（默认）
- **ORM**：SQLAlchemy
- **表单**：Flask-WTF
- **认证**：Flask-Login, Flask-Bcrypt
- **迁移**：Flask-Migrate
- **前端**：HTML, CSS, Bootstrap 4

## 安装与运行

### 1. 克隆项目

```bash
git clone https://github.com/yourusername/flask-learning-project.git
cd flask-learning-project
```

### 2. 创建虚拟环境

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. 安装依赖

```bash
pip install -r requirements.txt
```

### 4. 配置环境变量

编辑 `.env` 文件，设置 SECRET_KEY：

```
SECRET_KEY=your_secret_key_here
```

### 5. 初始化数据库

```bash
# 初始化数据库
export FLASK_APP=run.py  # Windows: set FLASK_APP=run.py
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### 6. 运行应用

```bash
python run.py
```

应用将在 http://localhost:5000 运行。

## 项目学习要点

1. **Flask 应用结构**：了解 Flask 项目的最佳实践结构
2. **蓝图**：学习如何使用蓝图组织路由
3. **数据库操作**：使用 SQLAlchemy ORM 进行数据库操作
4. **表单处理**：使用 Flask-WTF 处理表单数据和验证
5. **用户认证**：实现用户注册、登录和登出功能
6. **模板继承**：使用 Jinja2 模板引擎实现模板继承
7. **静态文件**：管理和使用静态文件
8. **环境变量**：使用 .env 文件管理环境变量
9. **数据库迁移**：使用 Flask-Migrate 进行数据库迁移

## Python 知识点复习

- **面向对象编程**：使用类和对象
- **装饰器**：使用 Flask 装饰器定义路由
- **异常处理**：处理表单验证错误
- **上下文管理器**：使用 db.session 进行数据库操作
- **条件语句**：在模板中使用条件语句
- **循环**：在模板中使用循环展示数据
- **函数**：定义视图函数和辅助函数
- **模块导入**：正确导入模块和包
- **环境变量**：使用 dotenv 管理环境变量

## 扩展功能

- 添加用户个人资料页面
- 实现评论功能
- 添加文件上传功能
- 实现分页功能
- 添加搜索功能
- 集成第三方登录
- 部署到生产环境

## 许可证

MIT
