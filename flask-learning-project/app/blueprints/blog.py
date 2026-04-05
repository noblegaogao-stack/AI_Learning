from flask import Blueprint, render_template, url_for, flash, redirect, request, abort
from app import db
from app.forms.post import PostForm
from app.models.post import Post
from flask_login import current_user, login_required

# 创建蓝图
blog = Blueprint('blog', __name__)

@blog.route('/post/new', methods=['GET', 'POST'])
@login_required
def new_post():
    """创建新文章路由"""
    form = PostForm()
    if form.validate_on_submit():
        # 创建文章
        post = Post(title=form.title.data, content=form.content.data, author=current_user)
        db.session.add(post)
        db.session.commit()
        
        flash('Your post has been created!', 'success')
        return redirect(url_for('main.home'))
    
    return render_template('blog/create_post.html', title='New Post', form=form, legend='New Post')

@blog.route('/post/<int:post_id>')
def post(post_id):
    """查看文章详情路由"""
    post = Post.query.get_or_404(post_id)
    return render_template('blog/post.html', title=post.title, post=post)

@blog.route('/post/<int:post_id>/update', methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    """更新文章路由"""
    post = Post.query.get_or_404(post_id)
    
    # 检查是否是文章作者
    if post.author != current_user:
        abort(403)
    
    form = PostForm()
    if form.validate_on_submit():
        post.title = form.title.data
        post.content = form.content.data
        db.session.commit()
        
        flash('Your post has been updated!', 'success')
        return redirect(url_for('blog.post', post_id=post.id))
    elif request.method == 'GET':
        # 填充表单
        form.title.data = post.title
        form.content.data = post.content
    
    return render_template('blog/create_post.html', title='Update Post', form=form, legend='Update Post')

@blog.route('/post/<int:post_id>/delete', methods=['POST'])
@login_required
def delete_post(post_id):
    """删除文章路由"""
    post = Post.query.get_or_404(post_id)
    
    # 检查是否是文章作者
    if post.author != current_user:
        abort(403)
    
    db.session.delete(post)
    db.session.commit()
    
    flash('Your post has been deleted!', 'success')
    return redirect(url_for('main.home'))
