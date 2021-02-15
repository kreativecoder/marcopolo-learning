package com.marcopololearning.products.controller;

import com.marcopololearning.products.dto.CreateProductRequest;
import com.marcopololearning.products.dto.EditProductRequest;
import com.marcopololearning.products.model.Product;
import com.marcopololearning.products.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @DeleteMapping("/{productId}")
    public void deleteProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
    }

    @PostMapping
    public Product addProduct(@RequestBody @Validated CreateProductRequest request) {
        return productService.addProduct(request);
    }

    @PostMapping("/{productId}")
    public Product editProduct(@PathVariable String productId, @RequestBody @Validated EditProductRequest request) {
        return productService.editProduct(productId, request);
    }
}
