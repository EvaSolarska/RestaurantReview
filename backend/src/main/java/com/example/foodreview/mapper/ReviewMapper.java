package com.example.foodreview.mapper;

import com.example.foodreview.dto.ReviewRequest;
import com.example.foodreview.dto.ReviewResponse;
import com.example.foodreview.entities.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "restaurant", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Review toEntity(ReviewRequest request);

    @Mapping(source = "user.username", target = "authorName")
    ReviewResponse toResponse(Review review);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateReviewFromRequest(ReviewRequest request, @MappingTarget Review review);
}