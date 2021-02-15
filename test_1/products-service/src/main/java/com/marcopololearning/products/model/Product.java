package com.marcopololearning.products.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Random;

@Document("products")
@Getter
@Setter
public class Product {
    @Id
    private String id;
    private String title;
    private String description;
    private String imageUrl;

    public Product(String title, String description) {
        this.title = title;
        this.description = description;
        // randomly get an image from the internet
        this.imageUrl = "https://picsum.photos/200?random=" + new Random().nextInt(1000);
    }
}
