package com.marcopololearning.products;

import com.marcopololearning.products.dto.CreateProductRequest;
import com.marcopololearning.products.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@RequiredArgsConstructor
@Slf4j
@SpringBootApplication
public class Application implements CommandLineRunner {

    private final ProductService productService;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Delete all products in the database.");
        productService.deleteAllProducts();

        log.info("Starting to pre-populate db with initial product data");

        productService.addProduct(new CreateProductRequest("shoes", "sample with shoes"));
        productService.addProduct(new CreateProductRequest("bags", "sample with bags"));
        productService.addProduct(new CreateProductRequest("clothes", "sample with clothes"));
        productService.addProduct(new CreateProductRequest("books", "sample with books"));
        productService.addProduct(new CreateProductRequest("pen", "sample with pen"));

        log.info(productService.getAllProducts().size() + " records in the database.");
    }
}
