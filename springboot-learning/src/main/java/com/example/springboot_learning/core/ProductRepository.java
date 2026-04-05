package com.example.springboot_learning.core;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * 产品仓库接口
 * 用于演示JPA的CRUD操作和自定义查询
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    /**
     * 根据名称模糊查询产品
     * @param name 产品名称
     * @return 产品列表
     */
    List<Product> findByNameContaining(String name);

    /**
     * 根据价格范围查询产品
     * @param minPrice 最低价格
     * @param maxPrice 最高价格
     * @return 产品列表
     */
    List<Product> findByPriceBetween(double minPrice, double maxPrice);

    /**
     * 使用JPQL查询库存大于指定值的产品
     * @param stock 库存阈值
     * @return 产品列表
     */
    @Query("SELECT p FROM Product p WHERE p.stock > :stock")
    List<Product> findByStockGreaterThan(@Param("stock") int stock);
}
