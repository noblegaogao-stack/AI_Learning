package com.example.springboot_learning.core;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * 产品服务类
 * 实现产品相关的业务逻辑
 */
@Service
public class ProductService {
    private final ProductRepository productRepository;

    // 构造方法注入
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * 获取所有产品
     * @return 产品列表
     */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * 根据ID获取产品
     * @param id 产品ID
     * @return 可选的产品对象
     */
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    /**
     * 创建新产品
     * @param product 产品对象
     * @return 创建的产品
     */
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * 更新产品
     * @param id 产品ID
     * @param product 产品对象
     * @return 更新后的产品
     */
    public Optional<Product> updateProduct(Long id, Product product) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setName(product.getName());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setStock(product.getStock());
            return Optional.of(productRepository.save(existingProduct));
        }
        return Optional.empty();
    }

    /**
     * 删除产品
     * @param id 产品ID
     * @return 是否删除成功
     */
    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * 根据名称模糊查询产品
     * @param name 产品名称
     * @return 产品列表
     */
    public List<Product> searchProductsByName(String name) {
        return productRepository.findByNameContaining(name);
    }

    /**
     * 根据价格范围查询产品
     * @param minPrice 最低价格
     * @param maxPrice 最高价格
     * @return 产品列表
     */
    public List<Product> searchProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    /**
     * 查询库存大于指定值的产品
     * @param stock 库存阈值
     * @return 产品列表
     */
    public List<Product> searchProductsByStockGreaterThan(int stock) {
        return productRepository.findByStockGreaterThan(stock);
    }
}
