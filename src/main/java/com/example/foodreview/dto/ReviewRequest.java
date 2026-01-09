package com.example.foodreview.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    @NotBlank(message = "Content cannot be empty")
    @Size(max = 1000, message = "Content cannot exceed 1000 characters")
    private String content;

    @Min(1) @Max(5)
    private int rating;
}