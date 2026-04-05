package com.example.springboot_learning.core;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * 产品控制器
 * 处理产品相关的HTTP请求
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    // 构造方法注入
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * 获取所有产品
     * @return 产品列表
     */
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    /**
     * 根据ID获取产品
     * @param id 产品ID
     * @return 产品对象
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * 创建新产品
     * @param product 产品对象
     * @return 创建的产品
     */
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    /**
     * 更新产品
     * @param id 产品ID
     * @param product 产品对象
     * @return 更新后的产品
     */
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Optional<Product> updatedProduct = productService.updateProduct(id, product);
        return updatedProduct.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    /**
     * 删除产品
     * @param id 产品ID
     * @return 删除结果
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.deleteProduct(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * 根据名称模糊查询产品
     * @param name 产品名称
     * @return 产品列表
     */
    @GetMapping("/search/name")
    public ResponseEntity<List<Product>> searchProductsByName(@RequestParam String name) {
        List<Product> products = productService.searchProductsByName(name);
        return ResponseEntity.ok(products);
    }

    /**
     * 根据价格范围查询产品
     * @param minPrice 最低价格
     * @param maxPrice 最高价格
     * @return 产品列表
     */
    @GetMapping("/search/price")
    public ResponseEntity<List<Product>> searchProductsByPriceRange(
            @RequestParam double minPrice, @RequestParam double maxPrice) {
        List<Product> products = productService.searchProductsByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    /**
     * 查询库存大于指定值的产品
     * @param stock 库存阈值
     * @return 产品列表
     */
    @GetMapping("/search/stock")
    public ResponseEntity<List<Product>> searchProductsByStockGreaterThan(@RequestParam int stock) {
        List<Product> products = productService.searchProductsByStockGreaterThan(stock);
        return ResponseEntity.ok(products);
    }
}
