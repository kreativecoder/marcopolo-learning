package com.marcopololearning.products.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditProductRequest {
    private String title;
    private String description;
}
