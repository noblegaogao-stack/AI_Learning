from flask import Blueprint, render_template, url_for, flash, redirect, request
from app import bcrypt, db
from app.forms.auth import RegistrationForm, LoginForm
from app.models.user import User
from flask_login import login_user, current_user, logout_user, login_required

# 创建蓝图
auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['GET', 'POST'])
def register():
    """注册路由"""
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    form = RegistrationForm()
    if form.validate_on_submit():
        # 哈希密码
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        # 创建用户
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('auth.login'))
    
    return render_template('auth/register.html', title='Register', form=form)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    """登录路由"""
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    form = LoginForm()
    if form.validate_on_submit():
        # 查找用户
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            # 登录用户
            login_user(user, remember=form.remember.data)
            # 处理重定向
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('main.home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    
    return render_template('auth/login.html', title='Login', form=form)

@auth.route('/logout')
def logout():
    """登出路由"""
    logout_user()
    return redirect(url_for('main.home'))
