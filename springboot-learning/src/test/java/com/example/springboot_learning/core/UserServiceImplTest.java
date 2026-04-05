package com.example.springboot_learning.core;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

/**
 * UserServiceImpl的单元测试
 * 测试用户服务的各个方法
 */
class UserServiceImplTest {

    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        userService = new UserServiceImpl();
    }

    @Test
    void testGetAllUsers() {
        List<User> users = userService.getAllUsers();
        assertNotNull(users);
        assertTrue(users.size() >= 3); // 初始化时有3个用户
    }

    @Test
    void testGetUserById() {
        Optional<User> user = userService.getUserById(1L);
        assertTrue(user.isPresent());
        assertEquals("张三", user.get().getName());
    }

    @Test
    void testCreateUser() {
        UserDTO userDTO = new UserDTO("赵六", "zhaoliu@example.com", 28);
        User user = userService.createUser(userDTO);
        assertNotNull(user);
        assertEquals("赵六", user.getName());
        assertEquals("zhaoliu@example.com", user.getEmail());
        assertEquals(28, user.getAge());
    }

    @Test
    void testUpdateUser() {
        UserDTO userDTO = new UserDTO("张三更新", "zhangsan-updated@example.com", 31);
        Optional<User> updatedUser = userService.updateUser(1L, userDTO);
        assertTrue(updatedUser.isPresent());
        assertEquals("张三更新", updatedUser.get().getName());
        assertEquals("zhangsan-updated@example.com", updatedUser.get().getEmail());
        assertEquals(31, updatedUser.get().getAge());
    }

    @Test
    void testUpdateUserNotFound() {
        UserDTO userDTO = new UserDTO("测试", "test@example.com", 25);
        assertThrows(UserNotFoundException.class, () -> {
            userService.updateUser(999L, userDTO);
        });
    }

    @Test
    void testDeleteUser() {
        boolean deleted = userService.deleteUser(1L);
        assertTrue(deleted);
        Optional<User> user = userService.getUserById(1L);
        assertFalse(user.isPresent());
    }

    @Test
    void testDeleteUserNotFound() {
        assertThrows(UserNotFoundException.class, () -> {
            userService.deleteUser(999L);
        });
    }
}
