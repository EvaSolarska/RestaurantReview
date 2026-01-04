package com.example.foodreview.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantResponse {

    private Long id;
    private String name;
    private String description;

    private String street;
    private String streetNumber;
    private String city;
    private String postalCode;

    private Double averageRating;
    private Integer reviewCount;

    private List<ReviewResponse> reviews;
}