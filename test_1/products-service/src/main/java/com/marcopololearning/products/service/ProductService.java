package com.marcopololearning.products.service;

import com.marcopololearning.products.dto.CreateProductRequest;
import com.marcopololearning.products.dto.EditProductRequest;
import com.marcopololearning.products.model.Product;
import com.marcopololearning.products.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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

    public Product addProduct(final CreateProductRequest request) {
        var product = new Product(request.getTitle(), request.getDescription());
        return productRepository.save(product);
    }

    public Product editProduct(final String productId, final EditProductRequest request) {
        var product = getProduct(productId)
                .orElseThrow(() -> new RuntimeException("Product with id not found."));

        if (!StringUtils.isEmpty(request.getTitle())) {
            product.setTitle(request.getTitle());
        }

        if (!StringUtils.isEmpty(request.getDescription())) {
            product.setTitle(request.getDescription());
        }

        return productRepository.save(product);
    }

    public void deleteProduct(final String productId) {
        productRepository.deleteById(productId);
    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }
}
