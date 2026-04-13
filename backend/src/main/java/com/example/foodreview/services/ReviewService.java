package com.example.foodreview.services;

import com.example.foodreview.dto.ReviewRequest;
import com.example.foodreview.dto.ReviewResponse;
import com.example.foodreview.entities.Restaurant;
import com.example.foodreview.entities.Review;
import com.example.foodreview.entities.Role;
import com.example.foodreview.entities.User;
import com.example.foodreview.exception.ResourceNotFoundException;
import com.example.foodreview.mapper.ReviewMapper;
import com.example.foodreview.repositories.RestaurantRepository;
import com.example.foodreview.repositories.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final RestaurantRepository restaurantRepository;
    private final ReviewMapper reviewMapper;

    public List<ReviewResponse> findByRestaurantId(Long restaurantId) {
        return reviewRepository.findByRestaurantId(restaurantId).stream()
                .map(reviewMapper::toResponse)
                .toList();
    }

    public ReviewResponse createReview(Long restaurantId, ReviewRequest request, User currentUser) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        Review review = reviewMapper.toEntity(request);

        review.setRestaurant(restaurant);
        review.setUser(currentUser);
        review.setCreatedAt(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);

        return reviewMapper.toResponse(savedReview);
    }

    public ReviewResponse editReview(Long reviewId, ReviewRequest request, User currentUser) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        checkAuthorization(review, currentUser);

        reviewMapper.updateReviewFromRequest(request, review);

        Review updatedReview = reviewRepository.save(review);
        return reviewMapper.toResponse(updatedReview);
    }

    public void deleteReview(Long reviewId, User currentUser) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        checkAuthorization(review, currentUser);
        reviewRepository.delete(review);
    }

    private void checkAuthorization(Review review, User currentUser) {
        boolean isOwner = review.getUser().getId().equals(currentUser.getId());
        boolean isAdmin = currentUser.getRole().equals(Role.ADMIN);

        if (!isOwner && !isAdmin) {
            throw new AccessDeniedException("You are not authorized to modify this review");
        }
    }
}
