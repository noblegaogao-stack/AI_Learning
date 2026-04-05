package com.example.springboot_learning.core;

import java.util.List;
import java.util.Optional;

/**
 * 用户服务接口
 * 定义用户相关的业务逻辑方法
 */
public interface UserService {
    /**
     * 获取所有用户
     * @return 用户列表
     */
    List<User> getAllUsers();

    /**
     * 根据ID获取用户
     * @param id 用户ID
     * @return 可选的用户对象
     */
    Optional<User> getUserById(Long id);

    /**
     * 创建新用户
     * @param userDTO 用户数据传输对象
     * @return 创建的用户
     */
    User createUser(UserDTO userDTO);

    /**
     * 更新用户
     * @param id 用户ID
     * @param userDTO 用户数据传输对象
     * @return 更新后的用户
     */
    Optional<User> updateUser(Long id, UserDTO userDTO);

    /**
     * 删除用户
     * @param id 用户ID
     * @return 是否删除成功
     */
    boolean deleteUser(Long id);
}
