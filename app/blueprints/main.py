from flask import Blueprint, render_template
from app.models.post import Post

# 创建蓝图
main = Blueprint('main', __name__)

@main.route('/')
@main.route('/home')
def home():
    """首页路由"""
    # 获取所有博客文章
    posts = Post.query.order_by(Post.date_posted.desc()).all()
    return render_template('main/home.html', posts=posts)

@main.route('/about')
def about():
    """关于页面路由"""
    return render_template('main/about.html', title='About')
