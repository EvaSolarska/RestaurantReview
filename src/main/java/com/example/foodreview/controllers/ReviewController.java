package com.example.foodreview.controllers;

import com.example.foodreview.dto.ReviewRequest;
import com.example.foodreview.dto.ReviewResponse;
import com.example.foodreview.security.AppUserDetails;
import com.example.foodreview.services.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants/{restaurantId}/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewResponse>> getReviews(@PathVariable Long restaurantId) {
        List<ReviewResponse> reviews = reviewService.findByRestaurantId(restaurantId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewResponse> addReview(
            @PathVariable Long restaurantId,
            @Valid @RequestBody ReviewRequest reviewRequest,
            @AuthenticationPrincipal AppUserDetails userDetails) {

        ReviewResponse response = reviewService.createReview(restaurantId, reviewRequest, userDetails.getUser());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReviewResponse> editReview(
            @PathVariable Long restaurantId,
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewRequest reviewRequest,
            @AuthenticationPrincipal AppUserDetails userDetails) {

        ReviewResponse response = reviewService.editReview(reviewId, reviewRequest, userDetails.getUser());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long restaurantId,
            @PathVariable Long reviewId,
            @AuthenticationPrincipal AppUserDetails userDetails) {

        reviewService.deleteReview(reviewId, userDetails.getUser());
        return ResponseEntity.noContent().build();
    }
}