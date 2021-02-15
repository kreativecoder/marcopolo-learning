package com.marcopololearning.products.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class CreateProductRequest {
    @NotBlank(message = "Title cannot be empty.")
    private String title;
    @NotBlank(message = "Description cannot be empty.")
    private String description;
}
