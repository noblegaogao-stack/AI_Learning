package com.example.springboot_learning.core;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

/**
 * 用户服务实现类
 * 实现用户相关的业务逻辑
 */
@Service
public class UserServiceImpl implements UserService {
    // 模拟数据库存储
    private final List<User> users = new ArrayList<>();
    // 用于生成唯一ID
    private final AtomicLong idGenerator = new AtomicLong(1);

    // 初始化一些测试数据
    public UserServiceImpl() {
        users.add(new User(idGenerator.getAndIncrement(), "张三", "zhangsan@example.com", 30));
        users.add(new User(idGenerator.getAndIncrement(), "李四", "lisi@example.com", 25));
        users.add(new User(idGenerator.getAndIncrement(), "王五", "wangwu@example.com", 35));
    }

    @Override
    public List<User> getAllUsers() {
        return users;
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return users.stream()
                .filter(user -> user.getId().equals(id))
                .findFirst();
    }

    @Override
    public User createUser(UserDTO userDTO) {
        User user = new User(
                idGenerator.getAndIncrement(),
                userDTO.getName(),
                userDTO.getEmail(),
                userDTO.getAge()
        );
        users.add(user);
        return user;
    }

    @Override
    public Optional<User> updateUser(Long id, UserDTO userDTO) {
        Optional<User> optionalUser = getUserById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDTO.getName());
            user.setEmail(userDTO.getEmail());
            user.setAge(userDTO.getAge());
            return Optional.of(user);
        }
        throw new UserNotFoundException("用户不存在，ID: " + id);
    }

    @Override
    public boolean deleteUser(Long id) {
        boolean deleted = users.removeIf(user -> user.getId().equals(id));
        if (!deleted) {
            throw new UserNotFoundException("用户不存在，ID: " + id);
        }
        return deleted;
    }
}
