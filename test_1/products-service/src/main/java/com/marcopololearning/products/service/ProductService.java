package com.marcopololearning.products.service;

import com.marcopololearning.products.model.Product;
import com.marcopololearning.products.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProduct(final String productId) {
        return productRepository.findById(productId);
    }

    public Product addProduct(final Product product) {
        return productRepository.save(product);
    }

    public Product editProduct(final Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(final String productId) {
        productRepository.deleteById(productId);
    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }
}
