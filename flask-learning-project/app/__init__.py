from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_migrate import Migrate

from app.config.config import config

# 初始化扩展
db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.login_message_category = 'info'
migrate = Migrate()

def create_app(config_name='default'):
    """创建 Flask 应用实例"""
    app = Flask(__name__)
    
    # 加载配置
    app.config.from_object(config[config_name])
    
    # 初始化扩展
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)
    
    # 注册蓝图
    from app.blueprints.auth import auth
    from app.blueprints.main import main
    from app.blueprints.blog import blog
    
    app.register_blueprint(auth)
    app.register_blueprint(main)
    app.register_blueprint(blog)
    
    return app
